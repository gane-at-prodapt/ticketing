import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident, User, AssignmentGroup , Access } from '../service.service';
import { MatButton } from '@angular/material/button';
import { getCookie} from 'typescript-cookie'
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

export interface ticketwithbuttons
{
  ticket: Incident;
  searchkey1:string|undefined;
  searchkey2:string|undefined;
  searchkey3:string|undefined;
  assignButton: any;
}


@Component({
  selector: 'app-resolve-ticket',
  templateUrl: './resolve-ticket.component.html',
  styleUrls: ['./resolve-ticket.component.css']
})
export class ResolveTicketComponent {

  @ViewChild('myModalClose') modalClose;

  DATA : ticketwithbuttons[] =[];
  users : User[]=[];
  user: User | undefined;
  selectedIncident : Incident|undefined;
  access: Access[]=[];


  
  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService,private toastr: ToastrService ) 
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

  getAssignedUser(u:User|undefined):string{
    if(u!=undefined && u.name!=undefined){
      return u.name;
    }else{
      return "-";
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



  setUser(index:number)
  {
    this.user= this.users[index];
  }

  closeModal(){
    this.users=[];
  }

  assignTicket(I:Incident){
    this.selectedIncident = I;
    console.log(I);
    let group = I.assignmentGroup;
    if(group!=undefined)
    this.service.getMembersByGroup(group.id).subscribe(Response=>{
      Response.forEach(element=>{
        this.users.push(element.groupMember);
      });
    },
    error=>{
      //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
      console.log(error);
    });
  }

  submitButton(){
    if(this.selectedIncident!=undefined){
      this.selectedIncident.assignedTo=this.user;
      this.selectedIncident.state="Assigned";
      this.service.putIncident(this.selectedIncident).subscribe((Response)=>{
        this.toastr.success('User assigned successfully');
        this.modalClose.nativeElement.click();
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      },
      error=>{
        console.log(error);
        this.modalClose.nativeElement.click();
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      })
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

    this.service.getAccessByRole(Number(getCookie("userRoleId"))).subscribe(Response=>{
      this.access=Response;
    },error=>{
      console.log(error);
    });

  this.service.getIncidentsByMemberGroups(Number(getCookie("userId"))).subscribe(Response=>{
    console.log(Number(getCookie("userId")));
    Response.forEach((element)=>{
      this.DATA.push({
        ticket: element,
        searchkey1:element.name,
        searchkey2:element.issue?.name,
        searchkey3:element.assignmentGroup?.name,
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

}

displayedColumns: string[] = ['id', 'name', 'issue', 'priority', 'severity', 'assignmentGroup','state', 'assignedTo' ,'assignButton'];
dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}



  


