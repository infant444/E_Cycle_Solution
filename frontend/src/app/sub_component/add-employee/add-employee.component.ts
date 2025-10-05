import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../model/user.model';
import { EmployeeComponent } from '../../Components/employee/employee.component';
import { UserServices } from '../../Services/user/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Title } from "../title/title";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatIconModule, Title],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit, OnChanges {
  @Input()
  display: string = "none";
  @Input()
  type: string = "add";
  @Input()
  user!: User;

  userForm!: FormGroup;
  isSubmitted = false;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  constructor(
    private userServices: UserServices,
    private employeeComponent: EmployeeComponent,
    private formBuilder: FormBuilder,
    private toasterServices:ToastrService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z .]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      contact: ['', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]+$/)]],
      role: ['', [Validators.required]],
      position: ['', [Validators.required]],
      profile: ['', Validators.required]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      console.log("jsj")
      this.changeValue();

    }
  }
  get FC() {
    return this.userForm.controls;
  }
  changeValue() {

  }
  close() {
    this.employeeComponent.dis();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  submit() {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return
    }
    const formData = new FormData();
    const fv = this.userForm.value;
    formData.append('file', this.selectedFile!);
    formData.append('name',fv.name);
    formData.append('email',fv.email);
    formData.append('dob',fv.dob);
    formData.append('position',fv.position);
    formData.append('role',fv.role);
    formData.append('contact',fv.contact);
    this.userServices.register(formData).subscribe(
      (res)=>{
        this.toasterServices.success("Successfully Register");
        this.close();
    },(err)=>{
      this.toasterServices.error(err.message)
    })
  }
}
