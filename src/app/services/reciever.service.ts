import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
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
  

  constructor(private http: HttpClient) { }

 
  // postRecieverDetails(formData:any) {
  //   return this.http.post(`${environment.baseUrl+'beneficiary/add'}` ,formData);
  // }

  getIfscCode() {
    return this.ifscList;
  }
}
