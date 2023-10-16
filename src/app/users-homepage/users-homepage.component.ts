import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-users-homepage',
  templateUrl: './users-homepage.component.html',
  styleUrls: ['./users-homepage.component.css']
})
export class UsersHomepageComponent {
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
