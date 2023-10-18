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
import { ServiceService, Role, Access } from '../service.service';
import { numberFormat } from 'highcharts';




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

  accessData:Access[]=[];
  selectedRole:Role|undefined;

  viewAccess(role:Role){
    this.selectedRole=role;
    this.service.getAccessByRole(role.id).subscribe((Response)=>{
      console.log(Response);
      this.accessData=Response;
      this.seconddataSource = new MatTableDataSource(this.accessData);
    },
    error=>{
      console.log(error);
    });
  }
  

  DATA: roleswithbutton[] =[];


  secondTable: string[] = ['module', 'moduleaccess']


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
        console.log(error);
      });
  } 
  displayedColumns: string[] = ['id', 'name','button'];
  dataSource = new MatTableDataSource(this.DATA);
  seconddataSource = new MatTableDataSource(this.accessData);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






}
