/*
=====================================
  ; Title: graph.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: graph.component.ts This component will handle
  ; the page that will display the graphs for the services selected by the users
======================================
*/


import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  graphData: any;

  constructor(private http:HttpClient) {

//Start of graph 

    this.graphData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
    } 
  
//End of graph



    this.http.get('/api/orders/all', {

    }).subscribe(
      res =>{

        console.log(res);
      },
      err => {
      },
      () => {
      });
  }

  ngOnInit() {
  }

}
