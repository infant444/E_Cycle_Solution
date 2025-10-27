import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Title } from "../title/title";
import { ViewInventoryComponent } from '../../Components/view-inventory/view-inventory.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Products, Transaction } from '../../model/inventory.model';
import { InventoryServices } from '../../Services/inventory/inventory';
import { ClientServices } from '../../Services/client/client';
import { ClientModel } from '../../model/client.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-sales',
  imports: [CommonModule, MatIconModule, Title, FormsModule, ReactiveFormsModule],
  templateUrl: './make-sales.html',
  styleUrl: './make-sales.css'
})
export class MakeSales implements OnInit {
  @Input()
  disable = false;

  @Input()
  inventoryId!: string;

  productGroup!: FormGroup;
  product!: Products[];
  quantity = 0;
  clients!: ClientModel[];
  transaction: Transaction[]=[];
  constructor(
    private viewInventoryComponent: ViewInventoryComponent,
    private fb: FormBuilder,
    private productServices: InventoryServices,
    private clientServices: ClientServices,
    private cd: ChangeDetectorRef,
    private toasterServices:ToastrService
  ) { }
  ngOnInit(): void {
    this.productGroup = this.fb.group({
      product: ['', [Validators.required]],
      qty: [0, [Validators.required]],
      unit_price: [0, [Validators.required]],
      client: ['', Validators.required],
      sale_date: ['', Validators.required],
      remark: ['']
    })
    this.productServices.getProductForParticularInventory(this.inventoryId).subscribe((res) => {
      this.product = res;
      this.cd.detectChanges()
    })
    this.clientServices.getAllClient().subscribe((res) => {
      this.clients = res;
      this.cd.detectChanges()
    });
    this.cd.markForCheck()
  }
  get Fc() {
    return this.productGroup.controls;
  }
  changeQuantity() {

    this.quantity = this.product.find(s => s.id === this.Fc.product.value)?.quantity || 0;

  }
  close() {
    this.viewInventoryComponent.addSales();
  }
  addProduct() {
    if (this.productGroup.invalid) {
      return;
    }
    const fv = this.productGroup.value;
    console.log(fv)
    const data: Transaction = {
      product_id: fv.product,
      type: 'Sale',
      quantity: fv.qty,
      unit_price: fv.unit_price,
      total_amount: fv.qty * fv.unit_price,
      transaction_date: fv.sale_date,
      customer_or_supplier: this.clients.find(s => s.id === fv.client)?.name || '',
      client: fv.client,
      payment_status: 'Paid',
      remarks: fv.remark
    }
    const index = this.product.findIndex(s => s.id === fv.product);
    if (index !== -1) {
      this.product[index].quantity -= fv.qty;
      if (this.product[index].quantity == 0) {
        this.product.splice(index, 1);
      }
    }
    this.transaction.push(data)
    this.createForm();
  }
  removeProduct(index: number) {
    this.transaction.splice(index, 1);
  }
  createForm() {
    this.productGroup = this.fb.group({
      product: ['', [Validators.required]],
      qty: [0, [Validators.required]],
      unit_price: [0, [Validators.required]],
      client: ['', Validators.required],
      sale_date: ['', Validators.required],
      remark: ['']
    })
  }
  getProduct(id: string) {
    return this.product?.find(s => s.id === id)?.product_name;
  }
  onSubmit() {
    if(this.transaction.length>0){
      this.productServices.SaleProduct(this.transaction).subscribe((res)=>{
        this.toasterServices.success(res.message);
        this.close()
      })
    }else{
      this.toasterServices.warning("Need to Add product")
    }
  }
}
