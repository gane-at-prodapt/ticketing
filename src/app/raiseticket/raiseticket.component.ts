import { Block } from '@angular/compiler';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-raiseticket',
  templateUrl: './raiseticket.component.html',
  styleUrls: ['./raiseticket.component.css']
})
export class RaiseticketComponent {

  countries:string[]= ["Colombia", "Africa", "United Kingdom", "South Korea","Canada","Japan", "Australia", "Denmark", 
   "Germany", "Indonesia", "India", "China", "Finland"];
  searchresult:string[] = this.countries;
  selectedList:string="";
  networkElements:string[]=["Broadband cable","Wireless dongle", "Modem", "Router", "Ethernet Cable", "Wireless access point", "Opical Network terminal", "Splitter", "Fiber Optic cable","Network switch"];
  networkFamily:string="";

  issue:string="";
  Priority:string="";
  Severity:string="";
  flexRadioDefault:string="";
 
  constructor(private router: Router) { } 

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

  getticketName(control:any):string
  {
    this.ticketName= control.value
    return '';
  }
  getnetworkFamily(control:any):string
  {
    this.networkFamily= control.value
    return '';
  }
  getissueName(control:any):string
  {
    this.issue= control.value
    return '';
  }
  getpriority(control:any):string
  {
    this.flexRadioDefault= control.value
    return '';
  }

  getvalue(selected: string)
  {
    this.issue= selected;
    this.updateName(this.issue)
  }

  getPriority(value:string)
  {
      this.Priority= value;
  }
  getSeverity(value:string)
  {
      this.Severity= value;
  }
 

  submitData()
  {
    console.log(this.ticketName);
    console.log(this.networkFamily);
    console.log(this.issue);
    console.log(this.Priority);
    console.log(this.Severity);
  

    const raiseTicket:JSON = <JSON><unknown>{
      "ticketName": this.ticketName,
      "networkFamily":this.networkFamily,
      "issue":this.issue,
      "priority":this.Priority,
      "severity":this.Severity
    
    }

    console.log(raiseTicket);
  }

  



  


  

  ngOnInit(){

    const wrapper= document.querySelector(".wrapper"),
    selectBtn= wrapper?.querySelector(".select-btn"),
    searchInp= wrapper?.querySelector("input"),
    options= wrapper?.querySelector(".options");

    const content = document.getElementById("content");


    

    

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

  

    searchInp?.addEventListener("keyup", () =>{
      
      // let arr =[];
      let arr: string[];

      let searchedVal = searchInp.value;
      arr = this.countries.filter( data => 
        {
          return data.toLowerCase().startsWith(searchedVal);
        }).map( data => data);
      console.log(arr);  
      this.searchresult=arr;
      // options?.innerHTML= arr;
    })


    selectBtn?.addEventListener("click",() =>
    {
      if(content?.style.display=="none"){
        content.style.display='block';
      }else{
        if(content!=null){
          content.style.display='none';
        }
      }
      // wrapper?.classList.toggle("active");
    });


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


    // id: number; (NN)
    // name: string;
    // networkElement: NetworkElement;
    // issue: Issue;
    // severity: number;
    // priority: number;
    // resolution_comment : string;(NN)
    // state: string;(default open)
    // assignmentGroup: AssignmentGroup;
    // assignedTo: User;(NN)
    // raisedBy: User;(Enter user)
    // modifiedOn: number;(Enter System time)

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
