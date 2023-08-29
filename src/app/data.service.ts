import { Injectable } from '@angular/core';
// import IfscJson from '../../assets/ifsc.json'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  amount=0;
  currencyCode='';
  accountNumber = 0;
  // ifscList:{code:string, ifsc:string, bank:string, branch:string}[]= IfscJson;

  private _recieverDetails: any;

  public get reciever() {
    return this._recieverDetails;
  }

public set reciever(data:any) {
  this._recieverDetails = data;
  console.log( this._recieverDetails);
}


getIfscCode() {
  // return this.ifscList;
}


  setTranferAmount(receivedAmount: number){
    this.amount = receivedAmount;
  }

  setCurrencyCode(code: string){
    this.currencyCode= code;
  }

  getTransferAmount(){
    return this.amount;
  }

  getCurrencyCode(){
    this.currencyCode;
  }

  setAccountDetails(accNumber: number){
    this.accountNumber = accNumber;
  }

  getAccountNumber(){
    return this.accountNumber;
  }

  constructor() { }
}
