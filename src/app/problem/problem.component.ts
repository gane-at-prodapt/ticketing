import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Issue, Access } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from 'typescript-cookie';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent {

  DATA : Issue[] =[];
  access : Access[]=[];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 
  
  navCreateIssue(){
    if(this.access[4]!=undefined && this.access[4].status=="write"){
      this.router.navigate(['/','addissue']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngOnInit() { 
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

      this.service.getIssues().subscribe(Response=>{
        this.DATA=Response;
        console.log(this.DATA);
        this.dataSource=new MatTableDataSource(this.DATA);
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });
  } 
  displayedColumns: string[] = ['id', 'name', 'network_family', 'description'];
  dataSource = new MatTableDataSource(this.DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
