import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClientModel } from '../../model/client.model';
import { Client } from '../../Components/client/client';
import { Title } from "../title/title";
import { ClientServices } from '../../Services/client/client';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, Title],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css'
})
export class AddClient implements OnInit,OnChanges {
  @Input()
  type:string='';

  @Input()
  clientInfo!:ClientModel;

  @Input()
  display:string='none';


  client!:FormGroup;
  isSubmitted:boolean=false;
  constructor(private formBuilder:FormBuilder,private clientx:Client,private clientServices:ClientServices, private toaster:ToastrService, private router:Router) {

  }
    ngOnInit(): void {
    // console.log(this.clientInfo);
      this.client=this.formBuilder.group({
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        type:['',Validators.required],
        phone:['',[Validators.required]],
        address:[''],
        website:[''],
        person:[''],
        special_info:[''],
    });
    if(this.type=='edit'){
      this.changeValue()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientInfo']) {
      this.changeValue();
    }
  }


  get FC(){
    return this.client.controls;
  }
  close(){
    this.clientx.dis();
  }
  changeValue(){
      this.FC.name.setValue(this.clientInfo?.name || '');
      this.FC.email.setValue(this.clientInfo?.email || '');
      this.FC.type.setValue(this.clientInfo?.type || '');
      this.FC.phone.setValue(this.clientInfo?.contact_number || '');
      this.FC.address.setValue(this.clientInfo?.address || '');
      this.FC.website.setValue(this.clientInfo?.website || '');
      this.FC.person.setValue(this.clientInfo?.contact_person || '');
      this.FC.special_info.setValue(this.clientInfo.special_instruction||'');
  }
  submit(){
    this.isSubmitted=true;
    if(this.client.invalid){
      return;
    }
    const Fx=this.client.value;
    const sent:ClientModel={
      id: '',
      name: Fx.name,
      email: Fx.email,
      type: Fx.type,
      contact_number: Fx.phone,
      address: Fx.address,
      website: Fx.website,
      no_project: 0,
      total_collection: 0,
      value: 0,
      is_current_project: false,
      current_project: '',
      contact_person: Fx.type == 'Individual' ? '' : Fx.person,
      last_collection_date: '',
      special_instruction: Fx.special_info
    }
    console.log(sent)
    if(this.type=="edit"){
      this.clientServices.updateClient(sent,this.clientInfo.id).subscribe((res)=>{
        this.toaster.success("Updated Successfully")
       this.clientx.dis();

      })
    }else{
      this.clientServices.addClient(sent).subscribe((res)=>{
        this.toaster.success("Add Successfully")
       this.clientx.dis();
      })

    }
  }
}
