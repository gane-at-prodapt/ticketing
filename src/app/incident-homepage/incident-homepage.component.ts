import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-incident-homepage',
  templateUrl: './incident-homepage.component.html',
  styleUrls: ['./incident-homepage.component.css']
})
export class IncidentHomepageComponent {

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
