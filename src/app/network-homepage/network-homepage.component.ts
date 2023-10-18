import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, NetworkElement,Access } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-network-homepage',
  templateUrl: './network-homepage.component.html',
  styleUrls: ['./network-homepage.component.css']
})
export class NetworkHomepageComponent {
  
  networkElements: NetworkElement[]=[];
  access:Access[] = [];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 

  navCreateNetwork(){
    if(this.access[0].status=="write"){
      this.router.navigate(['/','addnetwork']);
    }else{
      this.toastr.error('Access restricted');
    }
    
  }
  navCreateIncident(){
    if(this.access[2].status=="write"){
      this.router.navigate(['/','ticket']);
    }else{
      this.toastr.error('Access restricted');
    }
  }
  navCreateIssue(){
    if(this.access[4].status=="write"){
      this.router.navigate(['/','addissue']);
    }else{
      this.toastr.error('Access restricted');
    }
  }
  navCreateUser(){
    if(this.access[6].status=="write"){
      this.router.navigate(['/','adduser']);
    }else{
      this.toastr.error('Access restricted');
    }
  }
  
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getNetworkElements().subscribe(Response=>{
        this.networkElements=Response;
        console.log(this.networkElements);
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });

      this.service.getAccessByRole(Number(getCookie("userRoleId"))).subscribe(Response=>{
        this.access=Response;
      },error=>{
        console.log(error);
      });
  } 

}
