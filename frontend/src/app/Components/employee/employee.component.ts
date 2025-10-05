import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';
import { UserServices } from '../../Services/user/user';
import { AddEmployeeComponent } from "../../sub_component/add-employee/add-employee.component";
import { EmployeeInfoComponent } from "../../sub_component/employee-info/employee-info.component";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NotFound } from "../../sub_component/not-found/not-found";

@Component({
  selector: 'app-employee.component',
  imports: [Title, CommonModule, AddEmployeeComponent, EmployeeInfoComponent, FormsModule, MatIconModule, NotFound],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  user:User[]=[];
    display = 'none';
    type = 'add';
    editUser!:User;
    total:number=0;
    active:number=0;
    inactive:number=0;
    defaultUser:User[]=[];
    name:string='';
    active_status:string=''
    position_type:string='';
  constructor(
    private userServices:UserServices,
    private cd:ChangeDetectorRef
  ){}
  ngOnInit(): void {
    this.userServices.getAll().subscribe((res)=>{
      this.user=res;
      this.defaultUser=res;
      this.total=res.length;
      this.active=res.filter(s=>s.is_login==true).length;
      this.inactive=res.filter(s=>s.is_login==false).length;
      this.cd.markForCheck()
    });


  }
  dis(){
 if (this.display == 'none') {
      this.editUser = new User();
      this.display = 'flex';
    } else {
      this.display = 'none';
      this.reAssign()
    }
  }
  edit(x:User){
          if (this.display == 'none') {
        this.editUser = x;
        this.display = 'flex';
        this.type='edit'
        this.cd.detectChanges()
      } else {
        this.display = 'none';
        this.reAssign()
      }
    }
  reAssign(){

  }
  search(){
    if(this.name=='' || this.name.length<2){
      this.user=this.defaultUser;
    }else{
      this.user=this.defaultUser.filter(s=>s.name.toLowerCase().includes(this.name.toLowerCase()));
    }
    this.cd.markForCheck();
  }
  typeChange(){
     if(this.position_type==''){
      this.user=this.defaultUser;
    }else{
      this.user=this.defaultUser.filter(s=>s.position===this.position_type);
    }
  }
  activeChange(){
 if(this.active_status==''){
      this.user=this.defaultUser;
    }else if(this.active_status=='active'){
      this.user=this.defaultUser.filter(s=>s.is_login==true);
    }
    else if(this.active_status=='inactive'){
      this.user=this.defaultUser.filter(s=>s.is_login==false);

    }
  }
  changeText(t:string):string{
    const x=t.split("_");
    return x.join(" ");
  }
}
