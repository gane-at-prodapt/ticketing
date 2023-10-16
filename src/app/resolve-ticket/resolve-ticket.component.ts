import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident } from '../service.service';

@Component({
  selector: 'app-resolve-ticket',
  templateUrl: './resolve-ticket.component.html',
  styleUrls: ['./resolve-ticket.component.css']
})
export class ResolveTicketComponent {

  DATA : Incident[] =[];
  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) 
  { } 

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
  this.service.getIncidentsByGroup(7).subscribe(Response=>{
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

displayedColumns: string[] = ['id', 'name','issue','priority', 'severity', 'assignmentGroup'];
dataSource = new MatTableDataSource(this.DATA);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}



  


