import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, Incident, Access } from '../service.service';
import { MatTableDataSource } from '@angular/material/table';
import { getCookie } from 'typescript-cookie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incident-homepage',
  templateUrl: './incident-homepage.component.html',
  styleUrls: ['./incident-homepage.component.css']
})
export class IncidentHomepageComponent {

  incidents: Incident[]=[];
  access: Access[]=[];

  constructor(private router: Router, private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 
  
  getLevel(n: undefined | number): string
  {
    if(n==0)
    {
      return "Low";
    }
    else if(n==1)
    {
      return "Medium";
    }
    else
    {
      return "High";
    }
  }  

  
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

      this.service.getIncidents().subscribe(Response=>{
        this.incidents=Response;
        console.log(this.incidents);
      
      },
      error=>{
        //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
        console.log(error);
      });

  } 



}

