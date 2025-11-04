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
    product_id, type, quantity, unit_price, customer_or_supplier, payment_status,client,transaction_date
  ) VALUES ($1, $2, $3, $4, $5, $6,$7,$8)`,
                        [
                            productX.rows[0].id,          // from the inserted product
                            'Purchase',         // type of transaction
                            productX.rows[0].quantity,
                            productX.rows[0].unit_price,
                            company,
                            "Paid",
                            client_id,
                            productX.rows[0].stock_in_date
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
rout.get("/get-recent/productByClient/:clientId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const Products = await pool.query(`select * from products where inventory_id in (select id from inventory where client_id=$1)`, [req.params.clientId]);
            res.json(Products.rows);
        } catch (err) {
            next(err)
        }
    }
));
rout.get("/get-recent/productByStaff", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const Products = await pool.query(`select * from products where inventory_id in (select id from inventory where manager=$1)`, [req.user.id]);
            res.json(Products.rows);
        } catch (err) {
            next(err)
        }
    }
));
rout.get("/particular-inventory/state/:id", asyncHandler(
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
rout.get("/get/product/:inventoryId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const product = await pool.query("select * from products where inventory_id=$1 and quantity>0", [req.params.inventoryId]);
            res.json(product.rows);
        } catch (err) {
            next(err);
        }
    }
))
rout.get("/inventory/get-transaction/:inventoryId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const transaction = await pool.query("select * from transactions where  product_id in(select id from products where inventory_id=$1)", [req.params.inventoryId]);
            res.json(transaction.rows);
        } catch (err) {
            next(err);
        }
    }
));
rout.post("/product/add-sales", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const data = req.body;
            for (let i of data) {
                await pool.query(
                    `INSERT INTO transactions (
    product_id, type, quantity, unit_price, customer_or_supplier, payment_status,client,transaction_date,remarks
  ) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9) returning *`,
                    [
                        i.product_id,          // from the inserted product
                        'Sale',         // type of transaction
                        i.quantity,
                        i.unit_price,
                        i.customer_or_supplier,
                        "Paid",
                        i.client,
                        i.transaction_date,
                        i.remarks
                    ]
                );
                const product = await pool.query(`select * from products where id=$1`, [i.product_id]);
                if (product.rowCount != null && product.rowCount > 0) {
                    const qty = parseInt(product.rows[0].quantity) - parseInt(i.quantity);
                    var status = 'Available'
                    if (qty == 0) {
                        status = 'Sold Out'
                    }
                    const no_item_sold = parseInt(product.rows[0].no_item_sold) + parseInt(i.quantity);
                    const product_value = parseInt(product.rows[0].product_value || 0) + parseInt(i.total_amount)
                    console.log(parseInt(i.total_amount) - (parseInt(i.quantity) * parseInt(product.rows[0].unit_price)))
                    console.log(parseInt(i.total_amount) )
                    // console.log(((parseInt(i.total_amount) - (parseInt(i.quantity) * parseInt(product.rows[0].unit_price)))))
                    const profit_margin = parseInt(product.rows[0].profit_margin || 0) + ((parseInt(i.total_amount) - (parseInt(i.quantity) * parseInt(product.rows[0].unit_price))));
                    console.log(profit_margin);
                    await pool.query('update products set quantity=$1,status=$2,no_item_sold=$3,product_value=$4,profit_margin=$5,stock_out_date=$6 where id=$7',
                        [qty, status, no_item_sold, product_value, profit_margin, new Date(i.transaction_date), i.product_id]);
                    const inventory = await pool.query(`select * from inventory where id=$1`, [product.rows[0].inventory_id]);
                    if (inventory.rowCount != null && inventory.rowCount > 0) {
                        var statusX = 'Processed';
                        const qtyX = parseInt(inventory.rows[0].total_items) - parseInt(i.quantity);
                        if (qtyX == 0) {
                            statusX = 'Completed'
                        }
                        const total_value = parseInt(inventory.rows[0].total_value) - parseInt(i.total_amount);
                        const sale_quantity = parseInt(inventory.rows[0].sale_quantity) + parseInt(i.quantity);
                        const sale_price = parseInt(inventory.rows[0].sale_price) + parseInt(i.total_amount);
                        await pool.query('update inventory set status=$1,total_items=$2,total_value=$3,sale_quantity=$4,sale_price=$5,updated_by=$6 where id=$7',
                            [statusX, qtyX, total_value, sale_quantity, sale_price, req.user.id,product.rows[0].inventory_id])
                        const client = await pool.query('select * from client where id=$1', [i.client]);
                        const generateValue = parseInt(client.rows[0].value_generate) + parseInt(i.total_amount);
                        await pool.query('update client set value_generate=$1 where id=$2', [generateValue,i.client]);
                    }

                }
                // await pool.query(`select * from inventory where id=$1`,[])
            }
            res.json({ message: 'Add a sale successfully completed' })
        } catch (err) {
            next(err)
        }
    }
))
export default rout;