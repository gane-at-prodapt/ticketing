import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, AssignmentGroup, Access } from '../service.service';
import { getCookie } from 'typescript-cookie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-homepage',
  templateUrl: './group-homepage.component.html',
  styleUrls: ['./group-homepage.component.css']
})
export class GroupHomepageComponent {

  groups: AssignmentGroup[]=[];
  access:Access[] = [];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 

  navCreateNetwork(){
    if(this.access[0].status=="write"){
      this.router.navigate(['/','addnetwork']);
    }else{
      this.toastr.error('Access restricted');
    }
    
  }
  navCreateIncident(){
    if(this.access[2].status=="write"){
      this.router.navigate(['/','ticket']);
    }else{
      this.toastr.error('Access restricted');
    }
  }
  navCreateIssue(){
    if(this.access[4].status=="write"){
      this.router.navigate(['/','addissue']);
    }else{
      this.toastr.error('Access restricted');
    }
  }
  navCreateUser(){
    if(this.access[6].status=="write"){
      this.router.navigate(['/','adduser']);
    }else{
      this.toastr.error('Access restricted');
    }
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

      this.service.getAssignmentGroups().subscribe(Response=>{
        this.groups=Response;
      },
      error=>{
       
        console.log(error);
      });
  } 

}
