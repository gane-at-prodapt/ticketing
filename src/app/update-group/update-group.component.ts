import { Component } from '@angular/core';
// import { FaCoffee } from '@fortawesome/angular-fontawesome'
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent {
  // faCoffee = faCoffee;

  data: string[] = ["HTML", "CSS", "Bootstrap", "React"];
  checkedValue:string[]=[];
  constructor(private router: Router,) { } 
  


  oncheckk() {
    console.log("check" );
  }
  ngOnInit() {

    const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item"),
      checkbox = document.querySelectorAll(".item"),
      checks= document.querySelector('item-text');

      this.router.events.subscribe((event) => { 
        if (!(event instanceof NavigationEnd)) { 
            return; 
        } 
        window.scrollTo(0, 0) 
    }); 
    

    
      console.log(checks);

    selectBtn?.addEventListener("click", () => {
      selectBtn.classList.toggle("open");
    });

    checkbox.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("checked");

        let checked = document.querySelectorAll(".checked");
        let btnText = document.getElementById("select");
        let checkedvalue: string[] = [];
        checked.forEach(
          function (val) {
            console.log(val.getAttributeNames);
          }
        )
        // console.log(checks);

        if (checked && checked.length > 0) {
          if (btnText != null) {
            btnText.innerText = `${checked.length} `
          }


          console.log("valid");
        }
        else {
          console.log("invalid");
        }
      })
    })
  }



}
