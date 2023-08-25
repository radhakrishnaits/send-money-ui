import { AfterContentInit, Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit, AfterContentInit {

  constructor(private _snackBar: MatSnackBar) { }
  testing= true;
  // subTitle = " "
 subTitle= "To know the exact exchange rate and pricing summary, select a payment and payout method."
 currencySource = "INR";
 currencyTarget = "USD";
 amount = 0;
 fee = 0;
 currencyValueFrom = 0;
 currencyValutTo=0;
 total= this.amount+ this.fee;
 totalTargetCurrency = 0;


  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.totalTargetCurrency = (this.amount/this.currencyValueFrom)* this.currencyValutTo;
  }

  next(){
    // this.subTitle = "Exachange Rate"
    this.testing = !this.testing;
    if(this.testing){
      this.subTitle = "Exachange Rate"
    } else {
      this.subTitle= "To know the exact exchange rate and pricing summary, select a payment and payout method."
    }
  }

  proceed(){
    let message = 'Transaction Completed Successfull';
    this._snackBar.open(message,'Close',{duration: 3000});
  }

  cancel(){
   let message = 'Transaction Cancelled';
    this._snackBar.open(message,'Close',{duration: 3000});
  }

}
