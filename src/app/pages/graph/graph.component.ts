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
import  {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  //orders: any;
  //serviceArray: any;
  //priceArray: any;

  constructor(private http:HttpClient) {
    // retrieve all orders from DB
    this.http.get('/api/orders/all').subscribe(res => {
      this.purchases = res;

      // loop over purchases and split out services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.service);
        this.itemCount.push(item.count);
      }

      //build the object literal for the primeNG graph
      this.data = {
        labels: this.labels, //labels for services
        datasets: [
          //graph object
          {
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            data: this.itemCount
          },
        ]
      };

      // verify the data objects structure matches primeNG's expected format
      console.log('Data object');
      console.log(this.data);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }
}


// for(var i = 0; i < this.orders.length;i++){
//   this.serviceArray=this.orders[i].service
  // console.log(this.orders)

// }
// console.log(this.serviceArray)
