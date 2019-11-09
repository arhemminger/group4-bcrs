/*
=====================================
  ; Title: shop.component.ts
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: shop.component.ts
======================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {SummaryDialogComponent} from '../../summary-dialog/summary-dialog.component'
import { throwError } from 'rxjs';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  totalCost: number = 0;
  totalPart:number;
  totalLabor:number;
  totalServiceCost:number;
  partCost:number;
  userId:string;
  servicesArray=[];
  userLoggedIn:any;


  services = [{
      name: "Password Reset",
      cost: 39.99
  }
   ,
    {
      name: "Spyware Removal",
      cost: 99.99
    }
    ,
    {
      name: "RAM Upgrade",
      cost: 129.99
    }
    ,
    {
      name: "Software Installation",
      cost: 49.99
    },
     {
      name: "Tune-up",
      cost: 89.99
    },
    {
      name: "Keyboard Cleaning",
      cost: 45.00
    },
    {
      name: "Disk Clean-up",
      cost: 149.99
    }
  ]

  constructor(private dialog:MatDialog,private http: HttpClient,private cookieService: CookieService) {


    //Gets user Id from cookie
    this.userId = this.cookieService.get('userId');

    this.http.get('/api/users/' + this.userId).subscribe(res => {
      if (res) {
        //console.log(res);
        return this.userLoggedIn = res;
      } else {
        //do something return this.errorMessage = "OH NO, I couldn't find the quiz!!!";
      }

    })

    console.log(this.userId);
    console.log(this.userLoggedIn);



  }

  ngOnInit() {
  }
  onSubmit(formData) {


    for (const [key, value] of Object.entries(formData.checkGroup)){
      if(value){
        this.servicesArray.push({
          name: key
        });
      }
    }

    console.log(this.servicesArray);


    const lineItem = [];

    for (const savedService of this.services){
      for(const selectedService of this.servicesArray){
        if(savedService.name === selectedService.name ){
          lineItem.push({
            name: savedService.name,
            cost: savedService.cost
          })
        }
      }
    }

    console.log(lineItem);
    this.totalPart = formData.parts;
    this.totalLabor = formData.labor * 50;
    this.totalServiceCost = lineItem.reduce((prev, cur) => prev + cur.cost, 0);
    this.totalCost = this.totalPart + this.totalLabor + this.totalServiceCost;

    const invoice = {
      lineItem: lineItem,
      partsAmount: this.totalPart,
      laborAmount: this.totalLabor,
      lineItemTotal: this.totalServiceCost,
      total: this.totalCost,
      orderDate: new Date(),
      userId: this.userLoggedIn._id,
      userName: this.userLoggedIn.userName
    }

    console.log(invoice);





    this.partCost=formData.checkGroup.parts
  //  this.totalCost+=this.services.totalLabor
    this.dialog.open(SummaryDialogComponent,{
    data:{
      //services:this.servicesArray,
      //totalCost:this.totalCost.toFixed(2)
    }

    })

      this.http.post('/api/orders', {
        total: this.totalCost,
        productsOrdered: this.servicesArray
      }).subscribe(res => {

      }), err => {

      }


  }


  cancelForm(){

    this.servicesArray = [];
    this.totalCost = 0;

  }

}
