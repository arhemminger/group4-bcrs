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
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  totalCost=0;
  totalPart:number = 0;
  totalLabor:number = 0;
  partCost:number;
  userId:string;
  servicesArray=[];

  /*
  services = [{
    passwordReset: {
      name: "Password Reset",
      cost: 39.99
    },
    spywareRemoval: {
      name: "Spyware Removal",
      cost: 99.99
    },
    ramUpgrade: {
      name: "RAM Upgrade",
      cost: 129.99
    },
    softwareInstall: {
      name: "Software Installation",
      cost: 49.99
    },
    tuneUp: {
      name: "Tune-up",
      cost: 89.99
    },
    keyCleaning: {
      name: "Keyboard Cleaning",
      cost: 45.00
    },
    diskClean: {
      name: "Disk Clean-up",
      cost: 149.99
    },
    totalLabor:0,
    totalParts:0
  }]
*/


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
    //totalLabor:0,
    //totalParts:0
  ]

  constructor(private dialog:MatDialog,private http: HttpClient,private cookieService: CookieService) { }

  ngOnInit() {
  }
  onSubmit(formData) {

    /*

    if (formData.checkGroup.passwordReset) {
      //console.log(this.services.passwordReset.name + ' cost: $' + this.services.passwordReset.cost);

    }

    if (formData.checkGroup.spywareRemoval) {
     // console.log(this.services.spywareRemoval.name + ' cost: $' + this.services.spywareRemoval.cost);
     // this.totalCost+=this.services.spywareRemoval.cost
     // this.servicesArray.push(this.services.passwordReset)
    }

    if (formData.checkGroup.ramUpgrade) {
      //console.log(this.services.ramUpgrade.name + ' cost: $' + this.services.ramUpgrade.cost);
     // this.totalCost+=this.services.ramUpgrade.cost
      //this.servicesArray.push(this.services.ramUpgrade)

    }

    if (formData.checkGroup.softwareInstall) {
     // console.log(this.services.softwareInstall.name + ' cost: $' + this.services.softwareInstall.cost);
     // this.totalCost+=this.services.softwareInstall.cost
    //  this.servicesArray.push(this.services.softwareInstall)
    }

    if (formData.checkGroup.tuneUp) {
    //  console.log(this.services.tuneUp.name + ' cost: $' + this.services.tuneUp.cost);
    //  this.totalCost+=this.services.tuneUp.cost
    //  this.servicesArray.push(this.services.tuneUp)
    }

    if (formData.checkGroup.keyCleaning) {
   //   console.log(this.services.keyCleaning.name + ' cost: $' + this.services.keyCleaning.cost);
  //  this.totalCost+=this.services.keyCleaning.cost
  //  this.servicesArray.push(this.services.keyCleaning)
    }

    if (formData.checkGroup.diskClean) {
  //    console.log(this.services.diskClean.name + ' cost: $' + this.services.diskClean.cost);
  //    this.totalCost+=this.services.diskClean.cost
   //   this.servicesArray.push(this.services.diskClean)
    }
*/

    for (const [key, value] of Object.entries(formData.checkGroup)){
      if(value){
        this.servicesArray.push({
          name: key
        });
      }
    }

    console.log(this.servicesArray);




    this.partCost=formData.checkGroup.parts
  //  this.totalCost+=this.services.totalLabor
    this.dialog.open(SummaryDialogComponent,{
    data:{
      services:this.servicesArray,
      totalCost:this.totalCost.toFixed(2)
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
