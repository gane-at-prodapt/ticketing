import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Role {
  roleID: number;
  roleName: string;

}

export interface PeriodicElement {
  id: number;
  name: string;
  email:string;
  role:Role;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:101 , name: 'gojo' , email: 'gojo@gmail.com', role:{roleID:1, roleName:'Super admin'} }
  
]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
