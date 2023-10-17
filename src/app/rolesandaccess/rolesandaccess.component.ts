import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Role } from '../service.service';
import { numberFormat } from 'highcharts';

export interface access{
  module: string;
  moduleaccess: string;
}

const accessData: access[] =[
  { module: "Network", moduleaccess:"write | read"},
  { module: "Components", moduleaccess:"write | read"},
  { module: "Incident", moduleaccess:"write | read"},
  { module: "Group", moduleaccess:"write | read"},
  { module: "Issuse", moduleaccess:"write | read"},
  { module: "Role", moduleaccess:"read" },
  { module: "User", moduleaccess:"write | read" },
  { module: "Module", moduleaccess:"read" },
  

]



export interface roleswithbutton {
  role: Role;
  button: any;
}






@Component({
  selector: 'app-rolesandaccess',
  templateUrl: './rolesandaccess.component.html',
  styleUrls: ['./rolesandaccess.component.css']
})


export class RolesandaccessComponent {



  test(element:number)
  {
   console.log(element);
  }
  

  DATA: roleswithbutton[] =[];


  secondTable: string[] = ['module', 'moduleaccess']
  seconddataSource = new MatTableDataSource(accessData);



  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getRoles().subscribe(Response=>{
        Response.forEach((element)=>{
          this.DATA.push({
            role: element,
            button : "access"
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
  displayedColumns: string[] = ['id', 'name','button'];
  dataSource = new MatTableDataSource(this.DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






}
