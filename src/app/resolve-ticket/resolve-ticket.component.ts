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

export interface ticketwithbuttons
{
  ticket: Incident;
  assignButton: any;
}

@Component({
  selector: 'app-resolve-ticket',
  templateUrl: './resolve-ticket.component.html',
  styleUrls: ['./resolve-ticket.component.css']
})
export class ResolveTicketComponent {

  DATA : ticketwithbuttons[] =[];
  users : User[]=[];
  user: User | undefined;


  
  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) 
  { } 

  form:FormGroup = new FormGroup(
  {
  })
  
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


  setUser(index:number)
  {
    this.user= this.users[index];
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
    Response.forEach((element)=>{
      this.DATA.push({
        ticket: element,
        assignButton: "assign",
        
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

  this.service.getUsers().subscribe(Response=>{
    this.users=Response;
    console.log(this.users);
   
  
  },
  error=>{
    //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
    console.log(error);
  });



  //   window.addEventListener('scroll', function(){
  //     let value = window.scrollY;
  //     if(mynavbar1!=null){
  //       mynavbar1.style.top =  value  + 'px';
  //     }
  // });
}

displayedColumns: string[] = ['id', 'name', 'issue', 'priority', 'severity', 'assignmentGroup','assignedTo' ,'assignButton'];
dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}



  


