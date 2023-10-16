import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, AssignmentGroup } from '../service.service';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  DATA : AssignmentGroup[] = [];


  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getAssignmentGroups().subscribe(Response=>{
        this.DATA=Response;
        console.log(this.DATA);
        this.dataSource=new MatTableDataSource(this.DATA);
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });
  } 
  displayedColumns: string[] = ['id', 'name', 'issueName','networkFamily'];
  dataSource = new MatTableDataSource(this.DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
