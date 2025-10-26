import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
import { assginNewCollection } from "../controller/email.control";
import { MailConfig, mailGenerator } from "../config/mail.config";
import nodeMailer from 'nodemailer';
const rout = Router();
rout.use(auth);

rout.post("/add-inventory", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const {
                collection_name,
                company,
                stored_location,
                received_date,
                total_items,
                total_value,
                manager,
                client_id,
                manager_name,
                product,
            } = req.body;
            const inventory = await pool.query("insert into inventory (company,stored_location,received_date,manager,client_id,manager_name,total_items,total_value,created_by,updated_by,collection_name) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *;", [company, stored_location, received_date, manager, client_id, manager_name, total_items, total_value, req.user.id, req.user.id, collection_name])
            if (inventory.rowCount != null && inventory.rowCount > 0) {
                for (let i = 0; i < product.length; i++) {
                    const productX = await pool.query("insert into products (inventory_id,product_name,barcode,category,brand,quantity,stock_in_date,unit_price,condition)values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *", [inventory.rows[0].id, product[i].product_name, product[i].barcode, product[i].category, product[i].brand, product[i].quantity, product[i].stock_in_date, product[i].unit_price, product[i].condition])
                    await pool.query(
                        `INSERT INTO transactions (
    product_id, type, quantity, unit_price, customer_or_supplier, payment_status,client
  ) VALUES ($1, $2, $3, $4, $5, $6,$7)`,
                        [
                            productX.rows[0].id,          // from the inserted product
                            'Purchase',         // type of transaction
                            productX.rows[0].quantity,
                            productX.rows[0].unit_price,
                            company,
                            "Paid",
                            client_id
                        ]
                    );
                }
                const clientX = await pool.query("SELECT * FROM client WHERE id=$1", [client_id]);
                console.log(clientX.rowCount);
                if (clientX.rowCount != null && clientX.rowCount > 0) {
                    const collection = parseInt(clientX.rows[0].total_collection || 0) + 1;
                    const value = parseInt(clientX.rows[0].value || 0) + total_value;

                    await pool.query(
                        `UPDATE client 
                    SET total_collection=$1, value=$2, is_current_project=$3, last_collection_date=$4 
                    WHERE id=$5`,
                        [collection, value, true, received_date, client_id]
                    );
                }
                const user = await pool.query(`select * from staff where id=$1`, [manager]);

                if (user.rowCount != null && user.rowCount > 0) {
                    let transporter = nodeMailer.createTransport(MailConfig);
                    const mailTemplate = assginNewCollection(user.rows[0].name, inventory.rows[0].id);
                    const mail = mailGenerator.generate(mailTemplate);
                    let message = {
                        from: '"RI planIt " <riplanit@gmail.com>',
                        to: '<' + user.rows[0].email + '>',
                        subject: `Assignment to Manage the New Collection Project`,
                        html: mail,

                    }
                    await pool.query("insert into notifications (receiver_id,redirect,message) values ($1,$2,$3)", [manager, 'inventory/view/' + inventory.rows[0].id, 'You Assigned to a new Collection project is' + collection_name])

                    transporter.sendMail(message).then(() => {
                        console.log("Successfully send to " + user.rows[0].name)
                    })
                }
                const received_dateX = new Date(received_date); // example date
                const today = new Date();

                today.setHours(0, 0, 0, 0);
                received_dateX.setHours(0, 0, 0, 0);
                console.log(today)
                console.log(received_dateX)

                if (received_dateX > today) {

                    await pool.query(`insert into meeting (title, type, description, staff, start_date, start_time, end_date, end_time) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`, ['Schedule for the new collection as ' + collection_name, 'collection', '', manager, received_date, '00:00:00', received_date, '18:00:00']);
                }

                res.json(inventory.rows[0])
            }
        } catch (err) {
            next(err);
        }
    }
));

rout.get("/inventory/state", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const total = await pool.query("select count(*) as count from inventory", []);
            const total_product_purchase = await pool.query("select sum(quantity)as tap from transactions where type='Purchase'", []);
            const total_product_sales = await pool.query("select sum(quantity)as tas from transactions where type='Sale'", []);
            const total_product = await pool.query("select sum(total_items) as tp from inventory", [])
            const total_collection_completed = await pool.query("select count(*) as count from inventory where status='completed'", []);
            const profit = await pool.query(`
  SELECT 
    (COALESCE((SELECT SUM(total_amount) FROM transactions WHERE type='Sale'), 0)
     -
     COALESCE((SELECT SUM(total_amount) FROM transactions WHERE type='Purchase'), 0)
    ) AS profit
`);
            const result = {
                totalCollection: total.rows[0].count,
                totalProductPurchase: total_product_purchase.rows[0].tap || 0,
                totalProductSales: total_product_sales.rows[0].tas || 0,
                totalProduct: total_product.rows[0].tp || 0,
                totalCollectionCompleted: total_collection_completed.rows[0].count || 0,
                profit: profit.rows[0].profit
            }
            res.json(result);

        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/allCollection", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const result = await pool.query("select * from inventory", []);
            res.json(result.rows);
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/inventory/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const inventory = await pool.query("select * from inventory where id=$1", [req.params.id]);
            const product = await pool.query("select * from products where inventory_id=$1", [inventory.rows[0].id]);
            res.json({ ...inventory.rows[0], product: product.rows })
        } catch (err) {
            next(err)
        }
    }
));
rout.get("/get-recent/productByClient/:clientId",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
        const Products= await pool.query(`select * from products where inventory_id in (select id from inventory where client_id=$1)`,[req.params.clientId]);
        res.json(Products.rows);
        }catch(err){
            next(err)
        }
    }
));
rout.get("/get-recent/productByStaff",asyncHandler(
    async(req:any,res,next:NextFunction)=>{
        try{
        const Products= await pool.query(`select * from products where inventory_id in (select id from inventory where manager=$1)`,[req.user.id]);
        res.json(Products.rows);
        }catch(err){
            next(err)
        }
    }
));
rout.get("/particular-inventory/state/:id",asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const total = await pool.query("select sum(quantity) as count from products where inventory_id=$1", [req.params.id]);
            const total_product_purchase = await pool.query("select sum(quantity)as tap from transactions where type='Purchase' and product_id in(select id from products where inventory_id=$1)", [req.params.id]);
            const total_product_sales = await pool.query("select sum(quantity)as tas from transactions where type='Sale' and product_id in(select id from products where inventory_id=$1)", [req.params.id]);
            const profit = await pool.query(`
  SELECT 
    COALESCE(
      (SELECT SUM(total_amount) 
       FROM transactions 
       WHERE type = 'Sale' 
       AND product_id IN (SELECT id FROM products WHERE inventory_id = $1)
      ), 0
    )
    -
    COALESCE(
      (SELECT SUM(total_amount) 
       FROM transactions 
       WHERE type = 'Purchase' 
       AND product_id IN (SELECT id FROM products WHERE inventory_id = $1)
      ), 0
    ) AS profit
`, [req.params.id]);
            const result = {
                CurrentStock: total.rows[0].count,
                totalProductPurchase: total_product_purchase.rows[0].tap || 0,
                totalProductSales: total_product_sales.rows[0].tas || 0,
                profit: profit.rows[0].profit
            }
            res.json(result);

        } catch (err) {
            next(err);
        }
    }
));
rout.get("/inventory/get-transaction/:inventoryId",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
            const transaction = await pool.query("select * from transactions where  product_id in(select id from products where inventory_id=$1)", [req.params.inventoryId]);
            res.json(transaction.rows);
        }catch(err){
            next(err);
        }
    }
))
export default rout;