import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Role,Access } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-roles-homepage',
  templateUrl: './roles-homepage.component.html',
  styleUrls: ['./roles-homepage.component.css']
})
export class RolesHomepageComponent {

  roles: Role[]=[];
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
    if(this.access[2]!=undefined && this.access[2].status=="write"){
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
      this.service.getRoles().subscribe(Response=>{
        this.roles=Response;
        console.log(this.roles);
        
        
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });

      this.service.getAccessByRole(Number(getCookie("userRoleId"))).subscribe(Response=>{
        this.access=Response;
      },error=>{
        console.log(error);
      });
  } 

}
