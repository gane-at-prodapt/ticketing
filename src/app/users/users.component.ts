import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

export interface Role {
  id: number;
  name: string;
  createdOn:number;
}

export interface userDetails {
  id: number;
  name: string;
  email:string;
  role:Role;
  createdOn:number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  
  DATA : userDetails[] = [];

  constructor(private httpClient : HttpClient) {
    
  }

  ngOnInit(): void {
    this.httpClient.get<userDetails[]>('http://localhost:8088/api/v1/users/all').subscribe(Response=>{
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
