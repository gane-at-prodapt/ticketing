import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';

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



export interface PeriodicElement {
  name: string;
  position: number;
  // weight: number;
  // symbol: string;
  // group: number;
  // network: string;
  // incident: string;
  // issues:string;
  // groups: string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Super Admin'   },
  {position: 2, name: 'Network Admin'},
  {position: 3, name: 'Network Engineer'},
  {position: 4, name: 'Support Analyst'},
  {position: 5, name: 'Observer'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];




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
  
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  secondTable: string[] = ['module', 'moduleaccess']
  seconddataSource = new MatTableDataSource(accessData);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 
  } 






}
