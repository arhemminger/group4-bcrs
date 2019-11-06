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
import {SummaryDialogComponent} from '../../summary-dialog/summary-dialog.component'
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  totalCost=0;
  totalLabor:number;
  partCost:number;
  services = {
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
  }

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  onSubmit(formData) {
    if (formData.checkGroup.passwordReset) {
      console.log(this.services.passwordReset.name + ' cost: $' + this.services.passwordReset.cost);
      this.totalCost+=this.services.passwordReset.cost
    }

    if (formData.checkGroup.spywareRemoval) {
      console.log(this.services.spywareRemoval.name + ' cost: $' + this.services.spywareRemoval.cost);
      this.totalCost+=this.services.spywareRemoval.cost

    }

    if (formData.checkGroup.ramUpgrade) {
      console.log(this.services.ramUpgrade.name + ' cost: $' + this.services.ramUpgrade.cost);
      this.totalCost+=this.services.ramUpgrade.cost

    }

    if (formData.checkGroup.softwareInstall) {
      console.log(this.services.softwareInstall.name + ' cost: $' + this.services.softwareInstall.cost);
    this.totalCost+=this.services.softwareInstall.cost
    }

    if (formData.checkGroup.tuneUp) {
      console.log(this.services.tuneUp.name + ' cost: $' + this.services.tuneUp.cost);
      this.totalCost+=this.services.tuneUp.cost;
    }

    if (formData.checkGroup.keyCleaning) {
      console.log(this.services.keyCleaning.name + ' cost: $' + this.services.keyCleaning.cost);
    this.totalCost+=this.services.keyCleaning.cost;
    }

    if (formData.checkGroup.diskClean) {
      console.log(this.services.diskClean.name + ' cost: $' + this.services.diskClean.cost);
      this.totalCost+=this.services.diskClean.cost
    }
 console.log(parseInt(formData.checkGroup.labor)*50)
//  console.log(this.totalLabor)
//    this.partCost=formData.checkGroup.parts
//    this.totalCost+=this.services.totalLabor
// console.log(this.totalCost=+(this.totalLabor+this.partCost))
  this.dialog.open(SummaryDialogComponent,{
data:{
  totalCost:this.totalCost.toFixed(2)
}
    })

  }

}
