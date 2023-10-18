import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Incident, ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';

export interface closeTicket
{
  ticket: Incident;
  closeButton: any;
  reviewButton:any;
  movebackButton:any;
}

@Component({
  selector: 'app-close-ticket',
  templateUrl: './close-ticket.component.html',
  styleUrls: ['./close-ticket.component.css']
})
export class CloseTicketComponent {

  DATA : closeTicket[] =[];
  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 

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

  deleteItem(I:closeTicket){
    this.DATA=this.DATA.filter(obj=>obj.ticket.id!=I.ticket.id);
    this.dataSource= new MatTableDataSource(this.DATA);
  }

  closeTicket(I:closeTicket){
    let tempTicket = I.ticket;
    this.service.deleteIncident(tempTicket).subscribe((Response)=>{
      this.deleteItem(I);
      this.toastr.success('Ticket closed successfully');
    },
    error=>{

    });
  }

  moveBack(I:closeTicket){
    let tempTicket=I.ticket;
    tempTicket.state="Assigned";
    tempTicket.resolution_comment="Not Accepted";
    tempTicket.modifiedOn=Math.floor(Date.now() / 1000);
    this.service.putIncident(tempTicket).subscribe((Response)=>{
      this.deleteItem(I);
      this.toastr.success('Ticket moved back');
    },
    error=>{

    });
  }

  ngOnInit(){

    let navbar = document.getElementById('mynavbar');
    let mynavbar1= document.getElementById('nav1');
    let mynavbar2= document.getElementById('nav2');

   
    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 
  this.service.getIncidents().subscribe(Response=>{
    
    // this.DATA=Response;
    // console.log(this.DATA);
    // this.dataSource=new MatTableDataSource(this.DATA);
    Response.forEach((element)=>{
      if(element.state=="Resolved" || element.state=="Ignored"){
      this.DATA.push(
        {
          ticket:element,
          closeButton:"close",
          reviewButton:"review",
          movebackButton:"moveback"
        }
      );
      }
    });
    console.log(this.DATA);
    this.dataSource= new MatTableDataSource(this.DATA)
  
  },
  error=>{
    //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
    console.log(error);
  });


    window.addEventListener('scroll', function(){
      let value = window.scrollY;
      if(mynavbar1!=null){
        mynavbar1.style.top =  value  + 'px';
      }
  });
}

displayedColumns: string[] = ['id', 'name','issue','priority', 'severity', 'assignmentGroup','state','reviewButton','movebackButton','closeButton'];
dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
