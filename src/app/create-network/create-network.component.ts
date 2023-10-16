import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Router', weight: '192.158.1.38', symbol: '00:1B:44:11:3A:B7'},
  {position: 2, name: 'ONT', weight: '172.158.10.1', symbol: '00:B0:D0:63:C2:26'},
  {position: 3, name: 'OLT', weight: '192.158.1.38', symbol: '00:1B:63:84:45:E6'},
  
];

@Component({
  selector: 'app-create-network',
  templateUrl: './create-network.component.html',
  styleUrls: ['./create-network.component.css']
})
export class CreateNetworkComponent{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private router: Router) { } 

  // ngOnInit(){
  //   let value = document.getElementById('mysearch');
  //   if( value!= null)
  //   {
  //     return value;
  //   }
  // }

  ngOnInit()
  {
    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 
  
    let mynavbar1= document.getElementById('nav1');
    window.addEventListener('scroll', function(){
      let value = window.scrollY;
   
      // if(navbar!=null){
      //   navbar.style.top = value  + 'px';
      // }
      if(mynavbar1!=null){
        mynavbar1.style.top =  value  + 'px';
      }
  })
  }

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

 

}
