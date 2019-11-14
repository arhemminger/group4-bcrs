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
import {SummaryDialogComponent} from '../summary-dialog/summary-dialog.component'
import { throwError } from 'rxjs';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  totalCost: number = 0;
  totalPart:number = 0;
  totalLabor:number = 0;
  totalServiceCost:number;
  partCost:number = 0;
  userId:string;
  servicesArray=[];
  userLoggedIn:any;
  errorMessage:string;
  messageType:string;
  messageText:string;


  services = [{
      id:11,
      name: "Password Reset",
      cost: 39.99
  }
   ,
    {
      id:12,
      name: "Spyware Removal",
      cost: 99.99
    }
    ,
    {
      id:13,
      name: "RAM Upgrade",
      cost: 129.99
    }
    ,
    {
      id:14,
      name: "Software Installation",
      cost: 49.99
    },
     {
      id:15,
      name: "Tune-up",
      cost: 89.99
    },
    {
      id:16,
      name: "Keyboard Cleaning",
      cost: 45.00
    },
    {
      id:17,
      name: "Disk Clean-up",
      cost: 149.99
    }
  ]

  constructor(private dialog:MatDialog,private http: HttpClient,private cookieService: CookieService) {


    //Gets user Id from cookie
    this.userId = this.cookieService.get('userId');

    this.http.get('/api/users/' + this.userId).subscribe(res => {
      if (res) {

        return this.userLoggedIn = res;

      } else {

        return this.errorMessage = "OH NO, I couldn't find the User!!!";

      }

    })


  }//END OF CONSTRUCTOR

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
            id : savedService.id,
            name: savedService.name,
            cost: savedService.cost
          })
        }
      }
    }

    this.totalPart = parseFloat(formData.parts);
    console.log(this.totalPart);
    this.totalLabor = parseFloat(formData.labor) * 50;
    this.totalServiceCost = lineItem.reduce((prev, cur) => prev + cur.cost, 0);
    this.totalCost = this.totalPart + this.totalLabor + this.totalServiceCost;

    const invoice = {
      lineItem: lineItem,
      userId: this.userLoggedIn._id,
      userName: this.userLoggedIn.userName,
      parts: this.totalPart,
      labor: this.totalLabor,
      dateOrdered: new Date(),
      total: this.totalCost
    }
    console.log(invoice)
console.log(lineItem)

    const dialogRef = this.dialog.open(SummaryDialogComponent,{
      data:invoice,
      disableClose: false,
      width: '800px'
    });


    dialogRef.afterClosed().subscribe(result =>{
        if(result){
          console.log('do post')
          this.http.post('/api/orders',invoice).subscribe(
            res =>{
              console.log(res)
              this.servicesArray=[];
              this.messageText = "Thank you for placing a service request!";
              this.messageType = "success";
         })
        }else{
          console.log('order was canceled')
          this.servicesArray=[]
          this.messageText = "Your order was cancled!";
          this.messageType = "warn";
        }
      },
      err=>{
        console.log('there is an err' + err)

      });



}
}
