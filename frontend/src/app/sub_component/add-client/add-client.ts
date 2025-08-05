import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClientModel } from '../../model/client.model';
import { Client } from '../../Components/client/client';
import { Title } from "../title/title";
import { ClientServices } from '../../Services/client/client';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private formBuilder:FormBuilder,private clientx:Client,private clientServices:ClientServices, private toaster:ToastrService) {

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
    });
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
      this.FC.phone.setValue(this.clientInfo?.contactNumber || '');
      this.FC.address.setValue(this.clientInfo?.address || '');
      this.FC.website.setValue(this.clientInfo?.website || '');
      this.FC.person.setValue(this.clientInfo?.website || '');

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
      contactNumber: Fx.phone,
      address: Fx.address,
      website: Fx.website,
      noProject: 0,
      totalCollection: 0,
      value: 0,
      isCurrentProject: false,
      currentProject: '',
      contactPerson: Fx.type == 'Individual' ? '' : Fx.person,
      lastCollectionDate: '',
      specialInstruction: ''
    }
    console.log(sent)
    if(this.type=="edit"){
    }else{
      this.clientServices.addClient(sent).subscribe((res)=>{
        this.toaster.success("Add Successfully")
        this.clientx.dis();
      })

    }
  }
}
