import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role, ServiceService, User,Auth } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'highcharts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  userName:string="";
  email:string="";
  password:string="";
  role: Role| undefined;
  user:User|undefined;

  roles: Role[]=[];

  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) 
  { } 


  form:FormGroup = new FormGroup(
    {
      userName:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required, this.customEmailValidator])
    })

    getError(control:any): string
    {
      this.email=control.value;
      if(control.errors?.required && control.touched)
        return 'Field is required';
      else if(control.errors?.emailError && control.touched)
        return 'Please Enter valid Email ID'
      else return '';
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

    setPassword(pass:string){
      this.password=pass;
    }
    passwordSubmit(){

    }

    getuserName(control:any):string
    {
      this.userName= control.value
      return '';
    }


    getuserEmail(control:any):string
    {
      this.email= control.value
      return '';
    }

    

    setRole(index:number)
    {
      this.role= this.roles[index];

    }
    submit()
    {
      let createUser:User ={
        name:this.userName,
        email:this.email,
        role:this.role,
        createdOn: Math.floor(Date.now() / 1000)
      };
      this.service.addUser(createUser).subscribe((Response)=>{
        this.user=Response;
      },
      error=>{

      });
    }
    PasswordSubmit(){
      let createAuth:Auth={
        user:this.user,
        authToken:CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex),
        modifiedOn: Math.floor(Date.now() / 1000)
      };
      this.service.addAuth(createAuth).subscribe((Response)=>{
        console.log(Response);
      },
      error=>{

      });
    }

    ngOnInit(){
      this.service.getRoles().subscribe(Response=>{
        this.roles=Response;
        console.log(this.roles);
       
      
      },
      error=>{
        console.log(error);
      });
    
    
       

    }
  

   



}
