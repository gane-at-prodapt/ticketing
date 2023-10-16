import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-network-homepage',
  templateUrl: './network-homepage.component.html',
  styleUrls: ['./network-homepage.component.css']
})
export class NetworkHomepageComponent {
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
