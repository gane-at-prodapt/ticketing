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

  userRoleId:number = Number(getCookie("userRoleId"));
  groups: AssignmentGroup[]=[];
  access:Access[] = [];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 

  
  navCreateNetwork(){
    if(this.access[0]!=undefined && this.access[0].status=="write"){
      this.router.navigate(['/','addnetwork']);
    }
    
    else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    
  }
  navCreateIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','ticket']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
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
  navCreateUser(){
    if(this.access[6]!=undefined && this.access[6].status=="write"){
      this.router.navigate(['/','adduser']);
    }else{
      this.toastr.error('Access restricted');
    }

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });

  
  }

  navAssignIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','resolve']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  navMyIncident(){
    if(this.access[2]!=undefined && this.access[2].status=="write"){
      this.router.navigate(['/','myticket']);
    }else{
      this.toastr.error('Access restricted');
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  navcloseIncident(){
    if(this.userRoleId==1 || this.userRoleId==2){
      this.router.navigate(['/','close']);
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

      this.service.getAssignmentGroups().subscribe(Response=>{
        this.groups=Response;
      },
      error=>{
       
        console.log(error);
      });
  } 

}
