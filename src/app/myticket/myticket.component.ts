import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident, User, AssignmentGroup, Access } from '../service.service';
import { MatButton } from '@angular/material/button';
import { getCookie} from 'typescript-cookie'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


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

  access: Access[]=[];


  @ViewChild('myModalClose') modalClose;
  @ViewChild('myModalCloseignore') modalCloseignore;
  @ViewChild('myModalClosemove') modalClosemove;


  DATA : myticketswithbutton[] =[];

  groups: AssignmentGroup[]=[];
  group: AssignmentGroup | undefined;
  raisedBy:User|undefined;

  selectedIncident: Incident | undefined;

  movecause:string="";
  rootcause:string="";
  reason:string="";

  closeModal(){
    this.groups=[];
  }

  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) 
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


  resolveTicket(I:Incident){
    this.selectedIncident=I;
  }

  getName(u:User|undefined):string{
    if(u!=undefined){
      if(u.name!=undefined)
      return u.name;
      else
      return "-";
    }else{
      return "-";
    }
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
      tempTicket.modifiedOn=Math.floor(Date.now() / 1000);
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        console.log(Response);
        console.log("works");
        this.toastr.success('Ticket moved');
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        this.modalClosemove.nativeElement.click();
        
        if(tempTicket!=undefined)
        this.delete(tempTicket);

      },
    error=>{
      console.log(error);
      this.modalClosemove.nativeElement.click();
    });
    }
  }

  resolveTicketSubmit(){
    let tempTicket = this.selectedIncident;
    if(tempTicket!=undefined){
      tempTicket.state="Resolved";
      tempTicket.resolution_comment=this.rootcause;
      tempTicket.modifiedOn=Math.floor(Date.now() / 1000);
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        console.log(Response);
        this.toastr.success('Ticket resolved');
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        this.modalClose.nativeElement.click();
        
        if(tempTicket!=undefined)
        this.delete(tempTicket);

      },
    error=>{
      console.log(error);
      this.modalClose.nativeElement.click();
    });
    }
  }

  ignoreTicketSubmit(){
    let tempTicket = this.selectedIncident;
    if(tempTicket!=undefined){
      tempTicket.state="Ignored";
      tempTicket.resolution_comment=this.reason;
      tempTicket.modifiedOn=Math.floor(Date.now() / 1000);
      this.service.putIncident(tempTicket).subscribe((Response)=>{
        console.log(Response);
        this.toastr.success('Ticket ignored');
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        this.modalCloseignore.nativeElement.click();

        if(tempTicket!=undefined)
        this.delete(tempTicket);

      },
    error=>{
      console.log(error);
      this.modalCloseignore.nativeElement.click();
    });
    }
  }

  delete(I:Incident){
    this.DATA = this.DATA.filter(obj=>obj.ticket.id!=I.id);
    this.dataSource=new MatTableDataSource(this.DATA);
  }

  refresh(){
    this.service.getIncidentsByMember(Number(getCookie("userId"))).subscribe(Response=>{
      console.log(Number(getCookie("userId")));
      if(Response!=null)
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
      this.dataSource=new MatTableDataSource(this.DATA);
    
    },
    error=>{
      console.log(error);
    });
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

    this.service.getAccessByRole(Number(getCookie("userRoleId"))).subscribe(Response=>{
      this.access=Response;
    },error=>{
      console.log(error);
    });

    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
    }); 

    this.refresh();

  }
  displayedColumns: string[] = ['id', 'name', 'issue', 'priority', 'severity','state', 'assignmentGroup','assignedTo' ,'resolveButton', 'moveButton', 'ignoreButton'];
  dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
