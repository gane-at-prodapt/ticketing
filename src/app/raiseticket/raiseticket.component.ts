import { Block } from '@angular/compiler';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

  updateName(selectedLi: string)
  {

    const content = document.getElementById("selectedData");
    if(content!=null){
      content.innerText=selectedLi;
    }
    //  if(selectBtn!=null && selectBtn.firstElementChild!= null){
        // selectBtn.firstElementChild.innerHTML = selectedLi.innerHTML;
    //  }
  }

  


  form:FormGroup = new FormGroup(
    {
      
    }
  )

  ngOnInit(){

    const wrapper= document.querySelector(".wrapper"),
    selectBtn= wrapper?.querySelector(".select-btn"),
    searchInp= wrapper?.querySelector("input"),
    options= wrapper?.querySelector(".options");

    const content = document.getElementById("content");

  

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
    //  if(selectBtn!=null && selectBtn.firstElementChild!= null){
        // selectBtn.firstElementChild.innerHTML = selectedLi.innerHTML;
    //  }
  }
  

   

   

   
    



  }


 



  componentName:string="";
  networkID:number=0;
  issueName:number=0;
  groupName:number=0;
  
  networkElements:string[]= ["Select","Router","Modem","Firewall","Switch","OLT","ONT"];
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
