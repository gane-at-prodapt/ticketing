import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  constructor(private router: Router) {
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  email:string="";
  pass:string="";

  form:FormGroup = new FormGroup(
    {
      pass:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required, this.customEmailValidator])
    }
  )

  getError(control:any): string
  {
    this.email=control.value;
    if(control.errors?.required && control.touched)
      return 'Field is required';
    else if(control.errors?.emailError && control.touched)
      return 'Please Enter valid Email ID'
    else return '';
  }

  getpass(control:any):string
  {
    this.pass= control.value
    return ' '
  }
 
  customEmailValidator(control:AbstractControl)
  {
    const pattern= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const value= control.value;
    if(!pattern.test(value) && control.touched)
      return{
        emailError:true
      }
    else return null;

  }
  

  submit(){
    console.log(this.email);
    console.log(this.pass);
  }

  

  
}
