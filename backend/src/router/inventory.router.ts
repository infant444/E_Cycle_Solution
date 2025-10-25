import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
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
                if(clientX.rowCount!=null&&clientX.rowCount>0 ){
  const collection = parseInt(clientX.rows[0].total_collection || 0) + 1;
                const value = parseInt(clientX.rows[0].value || 0) + total_value;

                await pool.query(
                    `UPDATE client 
                    SET total_collection=$1, value=$2, is_current_project=$3, last_collection_date=$4 
                    WHERE id=$5`,
                    [collection, value, true, received_date, client_id]
                );
                }
              
                res.json(inventory.rows[0])
            }
        } catch (err) {
            next(err);
        }
    }
))


export default rout;