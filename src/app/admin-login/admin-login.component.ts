import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private router: Router) {
    
  }

  email:string="";
  pass:string="";
 
  
  

  submit(){
    console.log(this.email);
    console.log(this.pass);
  }

  

  gotoHome(){
    this.router.navigate(['/home']);  
}
}
