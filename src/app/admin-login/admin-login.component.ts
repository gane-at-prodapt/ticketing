import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

import * as CryptoJS from 'crypto-js'
import { ServiceService } from '../service.service';
import { setCookie } from 'typescript-cookie'


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  constructor(private httpClient : HttpClient,private router:Router, private service:ServiceService) {
    
  }
 
  ngOnInit() {
    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 
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
    return ''
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
    console.log(this.email,this.pass);
    let data = {"email":this.email,"token":CryptoJS.SHA256(this.pass).toString(CryptoJS.enc.Hex)};
    data["email"]=this.email;
    data["token"]=CryptoJS.SHA256(this.pass).toString(CryptoJS.enc.Hex);
  

    this.service.login(JSON.stringify(data)).subscribe(Response=>{
      setCookie("token",Response.authToken);
      if(Response.user!=undefined){
        setCookie("userId",Response.user.id);
        setCookie("userEmail",Response.user.email);
      }
      this.router.navigate(['/','homepage']);
    },
    error=>{
      //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
      console.log(error);
    });
  }

  

  
}
