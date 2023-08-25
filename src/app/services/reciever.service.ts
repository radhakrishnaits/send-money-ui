import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IfscJson from '../../assets/ifsc.json'

@Injectable({
  providedIn: 'root'
})
export class RecieverService {
  ifscList:{code:string, ifsc:string, bank:string, branch:string}[]= IfscJson;

private _recieverDetails: any;

public get reciever() {
  return this._recieverDetails;
}

public set reciever(data:any) {
  this._recieverDetails = data;
  console.log( this._recieverDetails);
}
  

  constructor() { }

 

  getIfscCode() {
    return this.ifscList;
  }
}
