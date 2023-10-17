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
  raisedBy:User|undefined;

  selectedIncident: Incident | undefined;

  movecause:string="";
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

  resolveTicket(I:Incident){
    this.selectedIncident=I;
  }

  moveTicket(I:Incident){
    this.selectedIncident=I;
    this.service.getAssignmentGroups().subscribe(Response=>{
      this.groups=Response;
    },
    error=>{
      console.log(error);
    });
  }
  closeMove(){
    this.groups=[];
  }
  IgnoreTicket(I:Incident){
    this.selectedIncident=I;
  }

  setGroup(index:number)
  {
    this.group= this.groups[index];
  }

  moveTicketSubmit(){
    let tempTicket = this.selectedIncident;
    if(tempTicket!=undefined){
      tempTicket.state="Moved";
      tempTicket.assignedTo=undefined;
      tempTicket.assignmentGroup=this.group;
      tempTicket.resolution_comment=this.movecause;
      tempTicket.raisedBy=this.raisedBy;
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        console.log(Response);
      },
    error=>{
      console.log(error);
    });
    }
  }

  resolveTicketSubmit(){
    let tempTicket = this.selectedIncident;
    if(tempTicket!=undefined){
      tempTicket.state="Resolved";
      tempTicket.resolution_comment=this.rootcause;
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        console.log(Response);
      },
    error=>{
      console.log(error);
    });
    }
  }

  ignoreTicketSubmit(){
    let tempTicket = this.selectedIncident;
    if(tempTicket!=undefined){
      tempTicket.state="Ignored";
      tempTicket.resolution_comment=this.reason;
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        console.log(Response);
      },
    error=>{
      console.log(error);
    });
    }
  }



  

  form:FormGroup = new FormGroup(
    {
      movecause:new FormControl("",[Validators.required]),
      rootcause:new FormControl("",[Validators.required]),
      reason:new FormControl("",[Validators.required]),
    })

    setRootcause(value:string){
      this.rootcause=value;
    }
    setMovecause(value:string){
      this.movecause=value;
    }
    setReason(value:string){
      this.reason=value;
    }

  ngOnInit(){

    let mynavbar1= document.getElementById('nav1');

    this.service.getUserById(Number(getCookie("userId"))).subscribe((Response)=>{
      this.raisedBy=Response;
    });

    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
    }); 

  this.service.getIncidentsByMember(Number(getCookie("userId"))).subscribe(Response=>{
    console.log(Number(getCookie("userId")));
    Response.forEach((element)=>{
      if(element.state=="Assigned"){
        this.DATA.push({
          ticket: element,
          resolveButton: "resolve",
          moveButton:"move",
          ignoreButton:"ignore"
          }
        );
      }
    });

    
    console.log(this.DATA);
    this.dataSource=new MatTableDataSource(this.DATA);
  
  },
  error=>{
    console.log(error);
  });

  }
  displayedColumns: string[] = ['id', 'name', 'issue', 'priority', 'severity','state', 'assignmentGroup','assignedTo' ,'resolveButton', 'moveButton', 'ignoreButton'];
  dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
