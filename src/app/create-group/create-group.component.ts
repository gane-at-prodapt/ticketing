import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, AssignmentGroup , Groupmembers} from '../service.service';

export interface assignmentGroupwithbuttons
{
  group: AssignmentGroup;
  memberButton: any;
}


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  DATA : assignmentGroupwithbuttons[] = [];
  DATA1: Groupmembers[]=[];

  selectedGroup: AssignmentGroup | undefined;
  
  
   memberButton(G:AssignmentGroup)
  { this.selectedGroup= G;

    this.service.getMembersByGroup(this.selectedGroup.id).subscribe(Response=>{
      this.DATA1=Response;
      console.log(Response);
      
      this.dataSource1=new MatTableDataSource(this.DATA1);
    
    },
    error=>{
      //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
      console.log(error);
    });

  }

  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 

      this.service.getAssignmentGroups().subscribe(Response=>{
        console.log(Response);
        Response.forEach((element)=>{
          this.DATA.push({
            group: element,
            memberButton : "members"
            }
          )
        });
        this.dataSource=new MatTableDataSource(this.DATA);
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });
      
  } 
  displayedColumns: string[] = ['id', 'name', 'issueName','networkFamily','memberButton'];
  dataSource = new MatTableDataSource(this.DATA);
  displayedColumns1: string[] = ['id','groupMember'];
  dataSource1 = new MatTableDataSource(this.DATA1);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }



}
