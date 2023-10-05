import { Component } from '@angular/core';

import {ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  // chart = new Chart (
  //   {
  //     chart: {
  //       type: 'line'
  //     },
  //     title:
  //     {
  //       text:'Linechart'
  //     },
  //     credits:
  //     {
  //       enabled:false
  //     },
  //     series: [
  //       {
  //         name: 'line 1',
  //         data: [1,2,3]
  //       }
  //     ]
      
  //   }
  // );

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
  

  

  employee()
  {
    
  }


}
