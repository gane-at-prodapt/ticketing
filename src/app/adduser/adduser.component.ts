import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  role: Role| undefined;

  roles: Role[]=[];

  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) 
  { } 


  form:FormGroup = new FormGroup(
    {
      userName:new FormControl("",[Validators.required]),
    })

    getuserName(control:any):string
    {
      this.userName= control.value
      return '';
    }

    submit()
    {
      console.log(this.userName);
      const newuserDetails:JSON = <JSON><unknown>{
        "userName":this.userName,

      }
      console.log(newuserDetails);


    }

    setRole(id:number)
    {
      this.role= this.roles[id];
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
