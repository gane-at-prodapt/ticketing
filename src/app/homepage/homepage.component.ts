import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,Renderer2, OnInit} from '@angular/core';
import { Chart, ChartData, ChartOptions, Title } from 'chart.js';
import { Router, NavigationEnd } from '@angular/router';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('inOutPaneAnimation', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HomepageComponent {

  name:string|undefined = getCookie('userName');
  role: string|undefined= getCookie('userRole');

  constructor(private router: Router) { } 

  
  lineChart2Data: ChartData<'doughnut'> = {
    labels: ['Open', 'Assigned', 'Ignored', 'Resolved', 'Closed'],
    datasets: [

      { label: 'dataset', data: [5, 3, 2 , 4 , 6],  backgroundColor: ['rgb(7, 86, 101)','rgb(86, 155, 169)','rgb(7, 86, 101)', 'rgb(86, 155, 169)', 'rgb(108, 159, 169)'], hoverBackgroundColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(151, 246, 245,0.6)', 'rgba(42, 205, 203,0.6)' ], 
      borderColor:['rgb(7, 86, 101)','rgb(86, 155, 169)','rgb(7, 86, 101)', 'rgb(86, 155, 169)', 'rgb(108, 159, 169)' ], 
    hoverBorderColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(151, 246, 245,0.6)', 'rgba(42, 205, 203,0.6)'] }, 
      ],
  };
  lineChart2Options: ChartOptions = {
    responsive:true,
    plugins:{
    },
  }


   barChartData: ChartData<'bar'> = {
    labels: ['SA', 'NA', 'NE', 'SA', 'OB'],
    datasets: [

      { label: 'dataset', borderRadius: 2,  data: [1, 6, 6 , 6 , 1],  backgroundColor: ['rgb(7, 86, 101)','rgb(86, 155, 169)','rgb(7, 86, 101)', 'rgb(86, 155, 169)', 'rgb(108, 159, 169)'], hoverBackgroundColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(151, 246, 245,0.6)', 'rgba(42, 205, 203,0.6)' ], 
      borderColor:['rgb(7, 86, 101)','rgb(86, 155, 169)','rgb(7, 86, 101)', 'rgb(86, 155, 169)', 'rgb(108, 159, 169)' ], 
    hoverBorderColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(151, 246, 245,0.6)', 'rgba(42, 205, 203,0.6)'] }, 
      ],
  };
    barChartDataOptions: ChartOptions = {
      responsive:false,
      plugins:{
      },
    }

    lineChartData: ChartData<'line'> = {
      labels: ['SA ', 'NA', 'NE', 'SA', ],
      datasets: [
  
        { label: 'dataset', data: [7, 5, 6 , 5 ],  backgroundColor: ['rgb(7, 86, 101)','rgb(86, 155, 169)','rgb(7, 86, 101)', 'rgb(86, 155, 169)', 'rgb(108, 159, 169)'], hoverBackgroundColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(151, 246, 245,0.6)', 'rgba(42, 205, 203,0.6)' ], 
        borderColor:['rgb(7, 86, 101)','rgb(86, 155, 169)','rgb(7, 86, 101)', 'rgb(86, 155, 169)', 'rgb(108, 159, 169)' ], 
      hoverBorderColor:['rgba(151, 246, 245,0.6)','rgba(42, 205, 203,0.6)','rgba(55, 201, 239,0.6)', 'rgba(151, 246, 245,0.6)', 'rgba(42, 205, 203,0.6)'] }, 
        ],
    };
      lineChartDataOptions: ChartOptions = {
        responsive:false,
        plugins:{
        },
      }

  ngOnInit(){
    let stars = document.getElementById('stars');
    let moon = document.getElementById('moon');
    let mountainback = document.getElementById('mountain_back');
    let mountainfront = document.getElementById('mountain_front');
    let text = document.getElementById('text');
    let text1 = document.getElementById('text1');
    let btn = document.getElementById('explore');
    let bubble1=document.getElementById('bubble1');
    let bubble2=document.getElementById('bubble2');
    let bubble3=document.getElementById('bubble3');
    let bubble4=document.getElementById('bubble4');
    let bubble5=document.getElementById('bubble5');
    let bubble6=document.getElementById('bubble6');
    let bubble7=document.getElementById('bubble7');
    let bubble8=document.getElementById('bubble8');

    let piechart=document.getElementById('pie');
    let piechart2=document.getElementById('pie2');
    let piechart3=document.getElementById('pie3');
    let pieArr = [piechart,piechart2,piechart3];

    this.router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 
    

    // piechart?.addEventListener("click", () => {
    //   if( piechart!= null)
    //   {
    //     piechart.classList.toggle("open");
    //   }
     
    // });

    // piechart?.addEventListener('click', function()
    // {

    // });




    let mybutton1= document.getElementById('button1');
    let mybutton2= document.getElementById('button2');
    let mybutton3= document.getElementById('button3');
    let buttonArr = [mybutton1,mybutton2,mybutton3];

     let card= document.getElementById('statscard'); 
   
    


    // mybutton1?.addEventListener( 'click', () =>
    // {
    //   if( piechart!= null)
    //   {
    //     piechart.classList.toggle("open");
    //   }
      
    // });

    let count = 0;
    setInterval( function()
    {
      buttonArr[count%3]?.click();
      if(buttonArr[count%3]!= null)
      {
        if(count!=0){
          buttonArr[(count-1)%3]?.classList.toggle("open");
          pieArr[(count-1)%3]?.classList.toggle("open");
         
         
        }        
        buttonArr[count%3]?.classList.toggle("open");
        pieArr[count%3]?.classList.toggle("open");
        
      }
      count+=1;
    
    },2000);


    
    

    



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
      if(text1!=null) {
        text1.style.bottom= 245 + value + 'px';
        text1.style.opacity = 100 - (value*0.5) + '%';
      }

      if(btn!=null) {
        btn.style.bottom = value +265  + 'px';
        btn.style.opacity = 100 - (value*0.25) + '%';
      }

      if(bubble1!=null) {
        bubble1.style.top = -value  + 'px';
        bubble1.style.opacity =  30 -(value*0.75) + '%';
      }
      if(bubble2!=null) {
        bubble2.style.top = -value  + 'px';
        bubble2.style.opacity = 30- (value*0.75) + '%';
      }
      if(bubble3!=null) {
        bubble3.style.top = -value  + 'px';
        bubble3.style.opacity = 30- (value*0.75) + '%';
      }
      if(bubble4!=null) {
        bubble4.style.top = -value  + 'px';
        bubble4.style.opacity = 30 - (value*0.75) + '%';
      }
      if(bubble5!=null) {
        bubble5.style.top = -value  + 'px';
        bubble5.style.opacity = 30 - (value*0.75) + '%';
      }
      if(bubble6!=null) {
        bubble6.style.top = -value  + 'px';
        bubble6.style.opacity = 30 - (value*0.75) + '%';
      }
      if(bubble7!=null) {
        bubble7.style.top = -value  + 'px';
        bubble7.style.opacity = 30 - (value*0.75) + '%';
      }
      if(bubble8!=null) {
        bubble8.style.top = -value  + 'px';
        bubble8.style.opacity = 30 - (value*0.75) + '%';
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
