import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, AssignmentGroup } from '../service.service';

@Component({
  selector: 'app-group-homepage',
  templateUrl: './group-homepage.component.html',
  styleUrls: ['./group-homepage.component.css']
})
export class GroupHomepageComponent {

  groups: AssignmentGroup[]=[];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getAssignmentGroups().subscribe(Response=>{
        this.groups=Response;
        console.log(this.groups);
        
        
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });
  } 

}
