import { Block } from '@angular/compiler';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AssignmentGroup, Issue, Incident, ServiceService,NetworkElement, User, Access} from '../service.service';
import { getCookie} from 'typescript-cookie'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-raiseticket',
  templateUrl: './raiseticket.component.html',
  styleUrls: ['./raiseticket.component.css']
})
export class RaiseticketComponent {

  networkFamilies:string[]=["Broadband cable","Wireless dongle", "Modem", "Router", "Ethernet Cable", "Wireless access point", "Opical Network terminal", "Splitter", "Fiber Optic cable","Network switch"];
  networkElements:NetworkElement[]=[];
  networkDevice:NetworkElement|undefined;
  issues:Issue[]=[];
  groups:AssignmentGroup[]=[];
  networkFamily:string="";
  userName:string="";
  userId:number =  Number(getCookie("userId"));;
  raisedBy:User|undefined;
  issue:Issue|undefined;
  group:AssignmentGroup|undefined;
  Priority:number|undefined;
  Severity:number|undefined;
  flexRadioDefault:string="";
  userRoleId:number = Number(getCookie("userRoleId"))
  access: Access[]=[];

  constructor(private router: Router, private service:ServiceService, private toastr: ToastrService ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  } 

  updateName(selectedLi: string)
  {

    const content = document.getElementById("selectedData");
    if(content!=null){
      content.innerText=selectedLi;
    }
  }

  ticketName:string="";
  form:FormGroup = new FormGroup(
    {
      userName:new FormControl("",[Validators.required]),
      ticketName:new FormControl("",[Validators.required]),
      networkFamily:new FormControl("",[Validators.required]),
      issue:new FormControl("",[Validators.required]),
      Priority:new FormControl("",[Validators.required]),
      flexRadioDefault:new FormControl("",[Validators.required]),
      Severity:new FormControl("",[Validators.required]),
    

  })
  select:FormControl = new FormControl(
    {
      networkFamily:new FormControl("",[Validators.required]),
      issue:new FormControl("",[Validators.required]),
      Priority:new FormControl("",[Validators.required]),
      Severity:new FormControl("",[Validators.required]),

    }
  )
  getuserName(control:any):string
  {
    this.userName= control.value
    return '';
  }
  setTicketName(value:string){
    this.ticketName=value;
  }

  getticketName(control:any):string
  {
    this.ticketName= control.value
    return '';
  }

  getPriority(value:number)
  {
      this.Priority= value;
  }
  getSeverity(value:number)
  {
      this.Severity= value;
  }

  setNetworkFamily(id:number){
    this.networkFamily= this.networkFamilies[id];
    this.service.getNetworkElementsByFamily(this.networkFamily).subscribe((Response)=>{
      this.networkElements=Response;
      console.log(this.networkElements);
    });
    let networkDeviceDropDown = document.getElementById("networkDeviceSelect");
    if(networkDeviceDropDown!=null){
      networkDeviceDropDown.style.display="block";
    }
  }

  setNetworkDevice(id:number){
    this.networkDevice = this.networkElements[id];
    this.service.getIssuesByNetworkDevice(this.networkFamily).subscribe((Response)=>{
      this.issues=Response;
      console.log(this.issues);
    });
    let issueDropDown = document.getElementById("IssueSelect");
    if(issueDropDown!=null){
      issueDropDown.style.display="block";
    }

  }

  setIssue(id:number){
    this.issue=this.issues[id];
    if(this.issue.id!=undefined)
    this.service.getAssignmentGroupsByIssue(this.issue.id).subscribe((Response)=>{
      this.groups=Response;
      console.log(this.issues);
    });
    let groupDropDown = document.getElementById("GroupSelect");
    if(groupDropDown!=null){
      groupDropDown.style.display="block";
    }

  }

  setGroup(id:number){
    this.group=this.groups[id];
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

 
 

  submitData()
  {


    this.userId = Number(getCookie("userId"));

 
    let I:Incident = {
      name:this.ticketName,
      networkElement:this.networkDevice,
      issue:this.issue,
      severity:this.Severity,
      priority:this.Priority,
      state:"Open",
      assignmentGroup:this.group,
      raisedBy:this.raisedBy,
      modifiedOn: Math.floor(Date.now() / 1000)
    };

    console.log(I);
    
    
    this.service.addIncident(I).subscribe((Response)=>{
      console.log(Response);
      this.toastr.success('Ticket raised successfully');
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
      this.router.navigateByUrl('/ticket');
    },
    error=>{
      //need to display "invalid credentials, try again" in the bottom of the form. clear the password field
      console.log(error);
      this.toastr.error('Failed to raise ticket');
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    });
  
    
  }

  



  


  

  ngOnInit(){
    
    this.service.getUserById(this.userId).subscribe((Response)=>{
      this.raisedBy=Response;
    });

    const wrapper= document.querySelector(".wrapper"),
    selectBtn= wrapper?.querySelector(".select-btn"),
    searchInp= wrapper?.querySelector("input"),
    options= wrapper?.querySelector(".options");

    const content = document.getElementById("content");


    this.service.getAccessByRole(Number(getCookie("userRoleId"))).subscribe(Response=>{
      this.access=Response;
    },error=>{
      console.log(error);
    });


    

    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 

  

    // let countries= ["Colombia", "Africa", "United Kingdom", "South Korea","Canada","Japan"];

    // function addCountry()
    // {
    //     countries.forEach(country => {
    //       let li = `<li onclick="updateName(this)" > ${country} </li>` ;
    //       options?.insertAdjacentHTML("beforeend", li);
          
    //     });
    // }

    // addCountry();

  

    // searchInp?.addEventListener("keyup", () =>{
      
    //   // let arr =[];
    //   let arr: string[];

    //   let searchedVal = searchInp.value;
    //   arr = this.countries.filter( data => 
    //     {
    //       return data.toLowerCase().startsWith(searchedVal);
    //     }).map( data => data);
    //   console.log(arr);  
    //   this.searchresult=arr;
    //   // options?.innerHTML= arr;
    // })


    // selectBtn?.addEventListener("click",() =>
    // {
    //   if(content?.style.display=="none"){
    //     content.style.display='block';
    //   }else{
    //     if(content!=null){
    //       content.style.display='none';
    //     }
    //   }
    //   // wrapper?.classList.toggle("active");
    // });


  function updateName(selectedLi: string)
  {
    console.log(selectedLi);
  }
  }


 



  componentName:string="";
  networkID:number=0;
  issueName:number=0;
  groupName:number=0;
  
  componentElements:string[]=["Select", "PC","VR","Projector","Smart Phone","Tablets","Smart Watch"];
  issueElements:string[]=["Select", "Network connectivity problem","Port not working","IP addresses issues", "Slow network speed", "DNS problems"]
  groupElements:string[]= ["Select","Group 1","Group 2","Group 3","Group 4","Group 5"];

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

   myFunction() {
    
    let a = document.getElementById("myDropdown")?.classList.toggle("show");
  }
  
   filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdown");
    if( div!= null)
    {
      a = div.getElementsByTagName("a");
    }
 
    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }




}
