import { Component } from '@angular/core';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css']
})
export class UpdateComponentComponent {
  
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
