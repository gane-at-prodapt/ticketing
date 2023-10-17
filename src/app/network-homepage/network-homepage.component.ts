import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, NetworkElement } from '../service.service';

@Component({
  selector: 'app-network-homepage',
  templateUrl: './network-homepage.component.html',
  styleUrls: ['./network-homepage.component.css']
})
export class NetworkHomepageComponent {
  
  networkElements: NetworkElement[]=[];
  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
 
      
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
  } 

}
