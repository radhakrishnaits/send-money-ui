import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import countries from 'src/country.json';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

interface Country {  
  currencyId: Number;  
  country: string;  
  countryCode: string;  
  currencyCode: string;  
  currency: string; 
} 

interface Option {
  id: Number;
  label: string;
  currencyCode: string;
}

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit{

  senderForm!: FormGroup;
  countries: Country[] = countries;
  options: any = this.mapCountries (this.countries) ;
  filteredOptions!: Observable<Option[]>; 
  recieverCurrencyCode: string = "INR";
  convertionURL: string = '';

  constructor(private fb: FormBuilder,private router: Router, private dataService: DataService, private http: HttpService){

    this.senderForm = this.fb.group({
      countryName: new FormControl({id: 89, label: 'India', currencyCode: 'INR'}, Validators.required),
      senderMoney:['',Validators.required],
      receiverMoney: ['',Validators.required],
    });
  }


  ngOnInit() {
    this.senderForm.controls['senderMoney'].valueChanges.subscribe(amount=>{
      this.dataService.setTranferAmount(amount);
    });
    this.filteredOptions = this.senderForm.controls['countryName'].valueChanges.pipe(
      startWith(''),
      map((value: string|Option) => {
        if (typeof value === 'string') {
          return this._filter(this.options, value);
        }
        return this.options;
      }));
  }
 
  private _filter(options: Option[] , label: string): Option[] {
    const value = label.trim().toLowerCase();
    return options.filter((option: Option) => {
      return option.label.toLowerCase().includes(value);
    });
  }

  private mapCountries(countries: Country[]): Option[] {
    return countries.reduce((options:Option [], country: Country) => {
      options.push({
        id:  country.currencyId,
        label: country.country,
        currencyCode : country.currencyCode
      });
      return options;
    }, []);
  }

  selectedCountry(event: any){
    this.recieverCurrencyCode = event.currencyCode;
    this.dataService.setCurrencyCode(this.recieverCurrencyCode);
    let resAmount=this.senderForm.controls['senderMoney'].value;
    this.checkTransactionRates(this.recieverCurrencyCode, resAmount);
  }

  onSendMoneyChange(){
   let resAmount=this.senderForm.controls['senderMoney'].value;
    this.checkTransactionRates(this.recieverCurrencyCode, resAmount);
  }

  checkTransactionRates(recieverCode: any, resAmount:1){
    this.http.getTransactionRates(recieverCode, resAmount).subscribe((data)=>{
      this.senderForm.patchValue({
        'receiverMoney': data.receiverAmount
      })
  });

  this.convertionURL = "1.00 INR = ` {{this.senderForm.controls['receiverMoney'].value}}` + ` {{recieverCode}}`";
  }

  displayLabelFn(option: Option|null) {
    return option ? option.label : '';
  }

  recieverOption(){
    console.log("Reciever")
  }

  navigateToReciever() {
    this.router.navigate(['/reciever']);
  }
}

