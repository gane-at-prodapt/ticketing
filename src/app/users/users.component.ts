import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ServiceService,User } from '../service.service';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  
  DATA : User[] = [];

  constructor(private httpClient : HttpClient, private router: Router, private service : ServiceService) {
    
  }

  ngOnInit(): void {

    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 

     this.service.getUsers().subscribe(Response=>{
      this.DATA=Response;
      console.log(this.DATA);
      this.dataSource=new MatTableDataSource(this.DATA);
    },
    error=>{
      //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
      console.log(error);
    });
  }

  

  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource(this.DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
