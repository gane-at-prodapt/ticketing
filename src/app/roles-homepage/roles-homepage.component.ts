import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-roles-homepage',
  templateUrl: './roles-homepage.component.html',
  styleUrls: ['./roles-homepage.component.css']
})
export class RolesHomepageComponent {
  constructor(private router: Router) { } 
      
  ngOnInit() { 
      this.router.events.subscribe((event) => { 
          if (!(event instanceof NavigationEnd)) { 
              return; 
          } 
          window.scrollTo(0, 0) 
      }); 
  } 

}
