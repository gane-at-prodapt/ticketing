import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-network',
  templateUrl: './update-network.component.html',
  styleUrls: ['./update-network.component.css']
})
export class UpdateNetworkComponent {

 
  networkName:string="";
  networkFamily:string="";
  networkParent:string="";
  IPAddress:string="";
  macAddress:string="";
  
  networkElements:string[]=["Router","Modem","Firewall","Switch","OLT","ONT"];
 
  form:FormGroup = new FormGroup(
    {
      networkFamily:new FormControl("",[Validators.required]),
      networkName:new FormControl("",[Validators.required]),
      networkParent:new FormControl("",[Validators.required]),
      IPAddress:new FormControl("",[Validators.required]),
      macAddress:new FormControl("",[Validators.required]),

    }
  )

  select:FormControl = new FormControl(
    {
      networkFamily:new FormControl("",[Validators.required])
    }
  )
  getnetworkName(control:any):string
  {
    this.networkName= control.value
    return '';
  }

  getnetworkFamily(control:any):string
  {
    this.networkFamily= control.value
    return '';
  }

  getnetworkParent(control:any):string
  {
    this.networkParent= control.value
    return '';
   
  }

  getIPAddresss(control:any):string
  {
    this.IPAddress= control.value
    return '';
  }

  getmacAddresss(control:any):string
  {
    this.macAddress= control.value
    return '';
  }


  submit()
  {

  console.log(this.networkName);
  console.log(this.networkFamily);
  console.log(this.networkParent);
  console.log(this.IPAddress);
  console.log(this.macAddress);

  const addNetwork:JSON = <JSON><unknown>{
    "networkName": this.networkName,
    "networkFamily": this.networkFamily,
    "networkParent": this.networkParent,
    "IPAddress": this.IPAddress,
    "macAddress": this.macAddress
  }
  console.log(addNetwork);
  }
 
 

 
 
 





 


}
