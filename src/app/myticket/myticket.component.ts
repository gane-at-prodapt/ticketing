import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident, User } from '../service.service';
import { MatButton } from '@angular/material/button';
import { getCookie} from 'typescript-cookie'
import { FormGroup } from '@angular/forms';

export interface myticketswithbutton
{
  ticket: Incident;
  resolveButton: any;
  moveButton:any;
  ignoreButton:any;
}

@Component({
  selector: 'app-myticket',
  templateUrl: './myticket.component.html',
  styleUrls: ['./myticket.component.css']
})
export class MyticketComponent {
  DATA : myticketswithbutton[] =[];

  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) 
  { } 
  getLevel(n:number): string
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

  ngOnInit(){

    let mynavbar1= document.getElementById('nav1');
 

   
    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
    }); 

  this.service.getIncidentsByMemberGroups(Number(getCookie("userId"))).subscribe(Response=>{
    console.log(Number(getCookie("userId")));
    Response.forEach((element)=>{
      this.DATA.push({
        ticket: element,
        resolveButton: "resolve",
        moveButton:"move",
        ignoreButton:"ignore"


        
        }
      )
    });
    
    console.log(this.DATA);
    this.dataSource=new MatTableDataSource(this.DATA);
  
  },
  error=>{
    //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
    console.log(error);
  });
  }
  displayedColumns: string[] = ['id', 'name', 'issue', 'priority', 'severity', 'assignmentGroup','assignedTo' ,'resolveButton', 'moveButton', 'ignoreButton'];
  dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
