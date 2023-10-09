import { Component } from '@angular/core';
// import { FaCoffee } from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent {
  // faCoffee = faCoffee;

  ngOnInit(){

    const selectBtn= document.querySelector(".select-btn"),
    items = document.querySelectorAll(".item");

    selectBtn?.addEventListener("click", () =>
    {
      selectBtn.classList.toggle("open");
    });

    items.forEach( item =>
      {
        item.addEventListener("click", () =>
        {
          item.classList.toggle("checked");

          let checked= document.querySelectorAll(".checked");
          let btnText = document.getElementById("select");

            console.log(checked.length);

            if( checked && checked.length > 0)
            {
              if(btnText!= null)
              {
                btnText.innerText = `${checked.length} `
              }
              
              
              console.log("valid");
            }
            else
            {
              console.log("invalid");
            }
        })
      })
  }



}
