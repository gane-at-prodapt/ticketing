import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Role } from '../service.service';

@Component({
  selector: 'app-roles-homepage',
  templateUrl: './roles-homepage.component.html',
  styleUrls: ['./roles-homepage.component.css']
})
export class RolesHomepageComponent {

  roles: Role[]=[];
  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 
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
