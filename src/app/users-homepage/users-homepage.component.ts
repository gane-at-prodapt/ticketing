import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, User } from '../service.service';

@Component({
  selector: 'app-users-homepage',
  templateUrl: './users-homepage.component.html',
  styleUrls: ['./users-homepage.component.css']
})
export class UsersHomepageComponent {

  users: User[] =[];
  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getUsers().subscribe(Response=>{
        this.users=Response;
        console.log(this.users);
        
        
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });
  } 

}
