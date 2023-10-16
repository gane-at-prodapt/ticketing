import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-issues-homepage',
  templateUrl: './issues-homepage.component.html',
  styleUrls: ['./issues-homepage.component.css']
})
export class IssuesHomepageComponent {

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
