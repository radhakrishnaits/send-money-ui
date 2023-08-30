import { AfterContentInit, Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {

  constructor(private router: Router, private httpService:HttpService,
    private snackBar: MatSnackBar,  private dataService: DataService, ) { }

  subTitle= "Exachange Rate"
  currencyValueFrom = 1;
  currencySource = "INR";
  targetCurrency=0;
  currencyTarget = "";
  amount = 0;
  transactionFee = 0;
  transactionTotal=0;
  totalTargetCurrency = 0;
  moneyTobeTransfer=0 ;
  cardDetails: any;

 ngOnInit(): void {
    this.amount = this.dataService.amount;
    this.currencyTarget= this.dataService.currencyCode;
    this.getTransactioRates();
    this.cardDetails = this.dataService.card;
}

getTransactioRates(){
    this.httpService.getTransactionRates(this.currencyTarget, 1).subscribe((data)=>{
    this.targetCurrency = Math.abs(data.fxrate);
    this.transactionFee = data.commission;
    this.transactionTotal =  this.amount + this.transactionFee;
  });
  this.httpService.getTransactionRates(this.currencyTarget, this.amount).subscribe((data)=>{
    this.moneyTobeTransfer =  data.receiverAmount;
  });
}


transferMoney() {
const tranferData = {
    "transactionId": Math.floor((Math.random() * 100) + 1),
    "senderId": 1,
    "receiverId": 1,
    "transactionAmount": this.transactionTotal,
    "senderPaymentMethod": null,
    "senderCardNumber": Number(this.cardDetails.cardNumber),
    "senderCardExpiry": this.cardDetails.cardExpiry,
    "senderNameOnCard": this.cardDetails.nameOnCard,
    "receiverPaymentMethod": null,
    "receiverAccountNumber": this.dataService.getAccountNumber(),
    "receiverIban": "string",
    "transactionType": "Card",
    "fxRate":  this.targetCurrency,
    "exchangeFee": this.transactionFee,
    "receiverPayout": 0,
    "senderCurrency": "INR",
    "receiverCurrency": this.targetCurrency,
    "receiverCountryIso": "string",
    "mtcn": null,
    "transactionStatus": "Initiated",
    "transactionDate": new Date(),
    "thirdPartyRefId": null,
    "createdBy": this.cardDetails.nameOnCard,
    "createdOn": new Date(),
    "modifiedBy": null,
    "modifiedOn": new Date(),
    "settlementRefId": null,
    "transactionSettledOn": null,
    "refundRefId": null,
    "remarks": null
  };

  this.httpService.saveTransaction(tranferData).subscribe( ()=>{
    const message = 'Transaction Completed Successfully';
    this.snackBar.open(message,'Close',{duration: 2000,   panelClass: 'app-notification-success',}, );
  });
  setTimeout(() => {
    this.router.navigate(['/sender']);
  }, 1000);
}

cancelTransaction(){
  const message = 'Transaction Cancelled';
  this.snackBar.open(message,'Close',{duration: 2000});
   setTimeout(() => {
    this.router.navigate(['/sender']);
  }, 1000);
}
}
