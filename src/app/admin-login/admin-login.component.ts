import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {


  email:string="";
  pass:string="";

  myFunction(x:any) {
    x = document.getElementById("togglePassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  submit(){
    console.log(this.email);
    console.log(this.pass);
  }

  constructor(private router: Router) {}

  gotoHome(){
    this.router.navigate(['/home']);  
}
}
