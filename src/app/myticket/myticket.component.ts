import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident, User, AssignmentGroup } from '../service.service';
import { MatButton } from '@angular/material/button';
import { getCookie} from 'typescript-cookie'
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  groups: AssignmentGroup[]=[];
  group: AssignmentGroup | undefined;

  solution:string="";
  rootcause:string="";
  reason:string="";

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

  setGroup(index:number)
  {
    this.group= this.groups[index];
  }

  form:FormGroup = new FormGroup(
    {
      solution:new FormControl("",[Validators.required]),
      rootcause:new FormControl("",[Validators.required]),
      reason:new FormControl("",[Validators.required]),
    })

    setRootcause(value:string){
      this.rootcause=value;
    }
    setSolution(value:string){
      this.solution=value;
    }
    setReason(value:string){
      this.reason=value;
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

  this.service.getAssignmentGroups().subscribe(Response=>{
    this.groups=Response;
    console.log(this.groups);
   
  
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
