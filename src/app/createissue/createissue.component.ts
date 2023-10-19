import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, NavigationEnd } from '@angular/router';
import { Issue, ServiceService } from '../service.service';
import { error } from 'highcharts';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  matcher = new ErrorStateMatcher();


  networkElements:string[]=["Broadband cable","Wireless dongle", "Modem", "Router", "Ethernet Cable", "Wireless access point", "Opical Network terminal", "Splitter", "Fiber Optic cable","Network switch"];
  networkElement:string|undefined;
  name:string|undefined;
  description:string|undefined;

  constructor(private router: Router, private service: ServiceService, private toastr: ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
   } 

  

  setNetworkElement(ind:number){
    this.networkElement=this.networkElements[ind];
  }
  setIssueName(str:string){
    this.name=str;
  }
  setIssueDesc(str:string){
    this.description=str;
  }
  submit(){
    let I:Issue={
      name:this.name,
      network_family:this.networkElement,
      description:this.description,
      modifiedOn: Math.floor(Date.now() / 1000)
    }
    this.service.addIssue(I).subscribe((Response)=>{
      this.toastr.success('Ticket raised successfully');
      this.router.navigateByUrl('/addissue');
    },error=>{
      this.toastr.error('Failed to raise ticket');
    })
  }
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 
  } 


}
