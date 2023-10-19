import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Incident, ServiceService, Access } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { getCookie} from 'typescript-cookie'

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
  selectTicket : closeTicket | undefined;
  
  access : Access[]=[];
  @ViewChild('modalCloseMove') modalClosemoveback;
  @ViewChild('modalCloseTicket') modalCloseclose;

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

  selectedTicket(sI:closeTicket)
  {
    this.selectTicket= sI;
  }

  closeTicket(){
    let tempTicket = this.selectTicket?.ticket;
    if(tempTicket!= undefined)
    this.service.deleteIncident(tempTicket).subscribe((Response)=>{
      if(this.selectTicket!= undefined){
        this.deleteItem(this.selectTicket);
        this.toastr.success('Ticket closed successfully');
        this.modalCloseclose.nativeElement.click();
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    },
    error=>{

    });
  }

  moveBack(){
    let tempTicket= this.selectTicket?.ticket;
    if(tempTicket!= undefined)
    { 
      tempTicket.state="Assigned";
      tempTicket.resolution_comment="Not Accepted";
      tempTicket.modifiedOn=Math.floor(Date.now() / 1000);
    
      
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        if(this.selectTicket!= undefined){
          console.log("hello");
          this.deleteItem(this.selectTicket);
          this.toastr.success('Ticket moved back');
          this.modalClosemoveback.nativeElement.click();
          window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
        }
    },
    error=>{

    });
  }
  }

  navCreateIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','ticket']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  navAssignIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','resolve']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  navMyIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','myticket']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  navcloseIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','close']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
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

  this.service.getAccessByRole(Number(getCookie("userRoleId"))).subscribe(Response=>{
    this.access=Response;
  },error=>{
    console.log(error);
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
