import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role, ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  userName:string="";
  email:string="";
  role: Role| undefined;

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
      console.log(this.userName);
      console.log(this.role);
      console.log(this.email);
      

    }

    ngOnInit(){
      this.service.getRoles().subscribe(Response=>{
        this.roles=Response;
        console.log(this.roles);
       
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });
    
    
       

    }
  

   



}
