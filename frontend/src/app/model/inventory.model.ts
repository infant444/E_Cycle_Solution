export class InventoryModel {
  id!: string;
  collection_name!:string;
  company!: string;
  stored_location!: string;
  received_date!: string;
  processed_date!: string;
  manager!: string;
  client_id!: string;
  manager_name!: string;
  product?: Products[];
  total_items!: number;
  total_value!: number;
  created_by!: string;
  updated_by!: string;
  status!:string;
}
export class Products {
  id!: string;
  inventory_id!: string;           // Foreign key to InventoryModel
  product_name!: string;
  barcode?: string;                // For scanning and tracking
  category!: string;
  brand?: string;
  quantity!: number;
  reorder_level!: number;          // Alert when stock is low
  stock_in_date!: string;
  stock_out_date?: string;
  unit_price!: number;
  total_value!: number;
  no_item_sold!: number;
  profit_margin?: number;          // Optional analytics field
  product_value!: number;          // Cost price per unit
  expiry_date?: string;            // For perishable items
  condition!: string;              // New, Used, Returned
  status!: string;                 // Available, Sold, Returned, etc.
  created_at!: string;
  updated_at!: string;

}
