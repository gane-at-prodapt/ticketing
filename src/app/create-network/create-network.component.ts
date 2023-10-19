import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService, NetworkElement, Access } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from 'typescript-cookie';



@Component({
  selector: 'app-create-network',
  templateUrl: './create-network.component.html',
  styleUrls: ['./create-network.component.css']
})
export class CreateNetworkComponent{

  DATA : NetworkElement[] =[];
  access : Access[]=[];

 
  constructor(private router: Router,private httpClient : HttpClient, private service : ServiceService, private toastr: ToastrService) { } 
  componentName:string="";
  networkID:number=0;
  
  networkElements:string[]=["Router","Modem","Firewall","Switch","OLT","ONT"];
  componentElements:string[]=["PC","VR","Projector","Smart Phone","Tablets","Smart Watch"];

 
  submit()
  {
    console.log(this.networkID);
    console.log(this.componentName);
    
    const rememberUser:JSON = <JSON><unknown>{
      "componentName": this.componentName,
      "networkID": this.networkID
    }
    console.log(rememberUser);
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

 


  ngOnInit()
  {
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

  
  this.service.getNetworkElements().subscribe(Response=>{
    this.DATA=Response;
    console.log(this.DATA);
    this.dataSource=new MatTableDataSource(this.DATA);
  
  },
  error=>{
    //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
    console.log(error);
  });

  
  let mynavbar1= document.getElementById('nav1');
  window.addEventListener('scroll', function(){
    let value = window.scrollY;
 
    if(mynavbar1!=null){
      mynavbar1.style.top =  value  + 'px';
    }
   });
  }
  displayedColumns: string[] = ['id', 'name', 'deviceFamily','ipv4Address','macAddress'];
  dataSource = new MatTableDataSource(this.DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

