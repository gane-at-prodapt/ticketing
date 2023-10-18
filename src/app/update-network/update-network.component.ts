import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { NetworkElement, ServiceService } from '../service.service';
import { error } from 'highcharts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-network',
  templateUrl: './update-network.component.html',
  styleUrls: ['./update-network.component.css']
})
export class UpdateNetworkComponent {

  constructor(private router: Router, private service:ServiceService,private toastr: ToastrService) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 
  } 

 
  networkName:string="";
  networkFamily:string="";
  networkParent:string="";
  IPAddress:string="";
  macAddress:string="";
  
  networkElements:string[]=["Broadband cable","Wireless dongle", "Modem", "Router", "Ethernet Cable", "Wireless access point", "Opical Network terminal", "Splitter", "Fiber Optic cable","Network switch"];
 
  setName(str:string){
    this.networkName=str;
  }
  setFamily(str:string){
    this.networkFamily=str;
  }
  setIp(str:string){
    this.IPAddress=str;
  }
  setMac(str:string){
    this.macAddress=str;
  }
  

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


  submit()
  {

    console.log(this.networkName);
    console.log(this.networkFamily);
    console.log(this.networkParent);
    console.log(this.IPAddress);
    console.log(this.macAddress);

    let N:NetworkElement={
      name:this.networkName,
      deviceFamily:this.networkFamily,
      ipv4Address:this.IPAddress,
      macAddress:this.macAddress,
      modifiedOn:Math.floor(Date.now() / 1000)
    }
    this.service.addNetworkElement(N).subscribe((Response)=>{
      this.toastr.success('New network device added successfully ');
    },
    error=>{
      this.toastr.error('Failed to create new network device');
    });
    


  }
 
 

 
 
 





 


}
