import { Component,Renderer2, OnInit} from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  
  lineChart2Data: ChartData<'polarArea'> = {

    labels: ['Open', 'Assigned', 'Ignored', 'Resolved', 'Closed'],


    datasets: [

      { label: 'dataset', data: [25, 20, 12 , 15 , 18],  backgroundColor: ['rgb(151, 246, 245)','rgb(42, 205, 203)','rgb(55, 201, 239)', 'rgb(44, 146, 213)', 'rgb(19, 83, 138)'], hoverBackgroundColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(44, 146, 213,0.6)', 'rgba(19, 83, 138,0.6)' ], 
      borderColor:['rgb(134, 234, 233)','rgb(62, 218, 216)','rgb(55, 201, 239)', 'rgb(44, 146, 213)', 'rgb(19, 83, 138)' ], 
    hoverBorderColor:['rgb(134, 234, 233)','rgb(62, 218, 216)','rgb(55, 201, 239)', 'rgb(44, 146, 213)', 'rgb(19, 83, 138)'] },
      // { label: 'Ignored', data: [12], backgroundColor:'rgb(255,255,0)'},
      // { label: 'Resolved', data: [12], backgroundColor:'rgb(2, 180, 3)'},     
      // { label: 'Closed', data: [9], backgroundColor:'rgb(103, 103, 202)'},
    
      ],


   

  };

 

  lineChart2Options: ChartOptions = {

  

    responsive:true,

    plugins:{

    },

   

  }

  ngOnInit(){
    let stars = document.getElementById('stars');
    let moon = document.getElementById('moon');
    let mountainback = document.getElementById('mountain_back');
    let mountainfront = document.getElementById('mountain_front');
    let text = document.getElementById('text');
    let btn = document.getElementById('explore');
    let bubble1=document.getElementById('bubble1');
    let bubble2=document.getElementById('bubble2');
    let bubble3=document.getElementById('bubble3');
    let bubble4=document.getElementById('bubble4');
    let bubble5=document.getElementById('bubble5');
    let bubble6=document.getElementById('bubble6');
    let bubble7=document.getElementById('bubble7');
    let bubble8=document.getElementById('bubble8');
    

    



  console.log("hello");

  window.addEventListener('scroll', function(){
      let value = window.scrollY;
   
      if(stars!=null){
        stars.style.left = value  + 'px';
      }
      if(moon!=null){
        moon.style.top = value  + 'px';
      }
      if(mountainback!=null){
        mountainback.style.top = value + 'px';
      }
      // if(mountainfront!=null){
      //   mountainfront.style.top = value + 'px';
      // }
      if(text!=null) {
        text.style.bottom= 250 + value + 'px';
        text.style.opacity = 100 - (value*0.5) + '%';
      }

      if(btn!=null) {
        btn.style.bottom = value +250  + 'px';
        btn.style.opacity = 100 - (value*0.25) + '%';
      }

      if(bubble1!=null) {
        bubble1.style.top = -value  + 'px';
      }
      if(bubble2!=null) {
        bubble2.style.top = -value  + 'px';
      }
      if(bubble3!=null) {
        bubble3.style.top = -value  + 'px';
      }
      if(bubble4!=null) {
        bubble4.style.top = -value  + 'px';
      }
      if(bubble5!=null) {
        bubble5.style.top = -value  + 'px';
      }
      if(bubble6!=null) {
        bubble6.style.top = -value  + 'px';
      }
      if(bubble7!=null) {
        bubble7.style.top = -value  + 'px';
      }
      if(bubble8!=null) {
        bubble8.style.top = -value  + 'px';
      }
      
      
      
      
      
      
      
  })
  }
  

  // move()
  // {
  //   let stars = document.getElementById('stars');
  //   let moon = document.getElementById('moon');
  //   let mountain_back = document.getElementById('mountain_back');
  //   let mountain_front = document.getElementById('mountain_front');
  //   let text = document.getElementById('text');
  //   let btn = document.getElementById('btn');
  
  //   window.addEventListener('scroll', function(){
  //       let value = window.scrollY;
  //       stars.style.left = value * 0.25 + 'px';
  //       moon.style.top = value * 0.25 + 'px';
  //       mountain_back.style.top = value + 'px';
  //   })
    

  // }

 
}
