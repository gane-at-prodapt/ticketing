import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident } from '../service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-incident-homepage',
  templateUrl: './incident-homepage.component.html',
  styleUrls: ['./incident-homepage.component.css']
})
export class IncidentHomepageComponent {

  incidents: Incident[]=[];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
  getLevel(n: undefined | number): string
  {
    if(n==0)
    {
      return "Low";
    }
    else if(n==1)
    {
      return "Medium";
    }
    else
    {
      return "High";
    }
  }  
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getIncidents().subscribe(Response=>{
        this.incidents=Response;
        console.log(this.incidents);
        
        
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });

  } 



}

