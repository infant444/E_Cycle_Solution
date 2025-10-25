import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Title } from "../title/title";
import { InventoryModel, Products } from '../../model/inventory.model';
import { InventoryServices } from '../../Services/inventory/inventory';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Inventory } from '../../Components/inventory/inventory';
import { ClientServices } from '../../Services/client/client';
import { UserServices } from '../../Services/user/user';
import { User } from '../../model/user.model';
import { ClientModel } from '../../model/client.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-inventory',
  imports: [CommonModule, MatIconModule, Title, FormsModule,ReactiveFormsModule],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent {
  @Input()
  display: string = "none";
  @Input()
  type: string = "add";
  @Input()
  inventoryX!:InventoryModel;

   inventoryForm!: FormGroup;
  productForm!: FormGroup;
  productList: Products[] = [];
  total_units:number=0;
  total_amount:number=0;
products: any;
user?:User[];
client?:ClientModel[];
  constructor(
    private fb: FormBuilder,
    private inventoryComponent:Inventory,
    private inventoryServices:InventoryServices,
    private clientServices:ClientServices,
    private userServices:UserServices,
    private cd:ChangeDetectorRef,
    private toasterServices:ToastrService
  ) {}

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      id: [''],
      collection_name:['',Validators.required],
      company: ['', Validators.required],
      stored_location: ['', Validators.required],
      received_date: ['', Validators.required],
      manage: ['', Validators.required]
    });
    this.userServices.getAll().subscribe((res)=>{
      this.user=res;
      this.cd.markForCheck();
    })
    this.clientServices.getAllClient().subscribe((res)=>{
      this.client=res;
    })
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      id: [''],
      inventory_id: [''],
      product_name: ['', Validators.required],
      barcode: [''],
      category: ['', Validators.required],
      brand: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      reorder_level: [5, Validators.required],
      stock_in_date: ['', Validators.required],
      unit_price: [0, Validators.required],
      total_value: [0],
      no_item_sold: [0],
      profit_margin: [0],
      product_value: [0],
      condition: ['New', Validators.required]
    });

    this.onAutoCalculate();
  }

  onAutoCalculate() {
    this.productForm.valueChanges.subscribe(() => {
      const qty = this.productForm.get('quantity')?.value || 0;
      const price = this.productForm.get('unit_price')?.value || 0;
      this.productForm.get('total_value')?.setValue(qty * price, { emitEvent: false });
    });
  }

  generateBarcode(): void {
    const barcode = `SN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.productForm.get('barcode')?.setValue(barcode);
  }

  generateId(): string {
    return 'INV-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value as Products;
      product.inventory_id = this.inventoryForm.get('id')?.value;
      product.total_value = product.quantity * product.unit_price;

      this.productList.push({ ...product });
      this.createProductForm(); // reset form after adding
    }
  }
  fileName = 'inventory_products.xlsx';

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      alert('Cannot upload multiple files');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.products = XLSX.utils.sheet_to_json(ws, { header: 0 });
      for (let x of this.products){
      const product = x as Products;
      product.inventory_id = this.inventoryForm.get('id')?.value;
      product.total_value = product.quantity * product.unit_price;
      this.productList.push({ ...product });
      }
      this.cd.markForCheck()
      console.log(this.products)
    };
    reader.readAsBinaryString(target.files[0]);
  }
  removeProduct(index: number) {
    this.productList.splice(index, 1);
  }

  onExcelUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      this.loadExcelData(data);
    };
    reader.readAsBinaryString(file);
  }

  loadExcelData(data: any[]): void {
    data.forEach(row => {
      const qty = Number(row['quantity']) || 0;
      const price = Number(row['unit_price']) || 0;
      this.productList.push({
        id: '',
        inventory_id: this.inventoryForm.value.id,
        product_name: row['product_name'] || '',
        barcode: row['barcode'] || '',
        category: row['category'] || '',
        brand: row['brand'] || '',
        quantity: qty,
        reorder_level: row['reorder_level'] || 5,
        stock_in_date: row['stock_in_date'] || '',
        unit_price: price,
        total_value: qty * price,
        no_item_sold: row['no_item_sold'] || 0,
        profit_margin: row['profit_margin'] || 0,
        product_value: row['product_value'] || 0,
        condition: row['condition'] || 'New',
        status: '',
        created_at: '',
        updated_at: ''
      });
    });
  }

  onSubmit(): void {
    if(this.inventoryForm.invalid){
      return;
    }
    this.total_amount=0;
      this.total_units=0;
    const x=this.inventoryForm.value
    this.productList.map((x)=>{
      this.total_amount+=x.total_value;
      this.total_units+=x.quantity;
    })
    const inventoryData:InventoryModel = {
      id: '',
      company: this.client?.find(s => s.id == x.company)?.name || '',
      stored_location: x.stored_location,
      received_date: x.received_date,
      processed_date: '',
      manager: x.manage,
      client_id: x.company,
      manager_name: this.user?.find(s => s.id == x.manage)?.name || '',
      product: this.productList,
      total_items: this.total_units,
      total_value: this.total_amount,
      created_by: '',
      updated_by: '',
      collection_name: x.collection_name,
      status: ''
    };
    console.log(inventoryData);
    this.inventoryServices.purchaseProduct(inventoryData).subscribe((res)=>{
      this.toasterServices.success("Successfully add the inventory")
    })
  }

close(){
  this.inventoryComponent.dis();
}
}
