import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident, Access , Role} from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from 'typescript-cookie';



@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent {

  DATA : Incident[] =[];
  userRoleId:number = Number(getCookie("userRoleId"))
  access: Access[]=[];
  roles: Role[]=[];

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
    if(this.userRoleId==1 || this.userRoleId==2){
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
    this.DATA=Response;
    console.log(this.DATA);
    this.dataSource=new MatTableDataSource(this.DATA);
  
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

displayedColumns: string[] = ['id', 'name','issue','priority', 'severity', 'assignmentGroup','state'];
dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}

