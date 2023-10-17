import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Issue } from '../service.service';
@Component({
  selector: 'app-issues-homepage',
  templateUrl: './issues-homepage.component.html',
  styleUrls: ['./issues-homepage.component.css']
})
export class IssuesHomepageComponent {

  issues: Issue[]=[];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getIssues().subscribe(Response=>{
        this.issues=Response;
        console.log(this.issues);
        
        
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });

  } 

  
  



}
