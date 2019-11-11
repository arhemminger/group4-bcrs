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
orders:any
serviceArray:any
priceArray:any
  constructor(private http:HttpClient) {
    this.http.get('/api/orders/all').subscribe(res => {
      if (res) {
       this.orders = res;
      } else {
        console.log("OH NO, I couldn't find any users!!!");
      }

    })
// for(var i = 0; i < this.orders.length;i++){
//   this.serviceArray=this.orders[i].service
   console.log(this.orders)

// }
// console.log(this.serviceArray)
  }

  ngOnInit() {
  }

}
