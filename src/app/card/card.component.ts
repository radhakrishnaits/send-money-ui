import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';  
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cardForm: FormGroup  = new FormGroup({
    nameOnCard: new FormControl(''),
    cardNumber: new FormControl(''),
    cardExpiry: new FormControl(''),
    ccv: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private httpService: HttpService,
    private dataService: DataService, private router: Router) {
    this.cardForm = this.formBuilder.group({
      nameOnCard: ['', [Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9_@-]{0,50}$')
      ]],
      cardNumber: ['', [Validators.required, 
        Validators.minLength(12), 
        Validators.maxLength(16),
        Validators.pattern('[0-9]{12,16}$')
      ]],
      cardExpiry: ['', [Validators.required,
        // Validators.pattern('^((0[1-9]|1[0-2])\/\d{2})$') //[A-Za-z]{4}[A-Z0-9a-z]{6,7}$
      ]],
      ccv: ['', [Validators.required,
        Validators.minLength(3), 
        Validators.maxLength(4),
        Validators.pattern('[0-9]{3,4}$')
      ]],
      })
   }

  ngOnInit(): void {
  }

  get card(): { [key: string]: AbstractControl } {
    return this.cardForm.controls;
  }

  onCardFormSubmit(formData: any) {
    if (this.cardForm.valid) {
      this.navigateToSummary();
    }

    this.dataService.card = formData; // for set
    console.log('-------------------');  
    console.log(this.dataService.card);   // for get

    const data = {
        cardExpiry: formData.cardExpiry,
        cardNumber: Number(formData.cardNumber),
        nameOnCard: formData.nameOnCard,
        status: "",
        userId: 0
    }

    // this.httpService.postCardDetails(data).subscribe(
    //   (response) => {
    //     console.log('Response from backend:', response);
    //     this.navigateToSummary();
    //     // Handle the response from the backend if needed
    //   },
    //   (error) => {
    //     console.error('Error sending data:', error);
    //     // Handle errors if needed
    //   }
    // );
  } 
  
   isCCExpired() {
    const cardExpiry=  this.cardForm.controls['cardExpiry'].value;
    let out = false;
    if (cardExpiry){
      const [mm,yy] = cardExpiry.split("/");
      const dateObj = new Date(+yy + 2000,mm-1,15); // months are 0 based and don't take the 1st due to timezones
      console.log(dateObj);
      out = dateObj.getTime() < new Date().getTime();
    }
    return out;
  }

  navigateToSummary() {
    this.router.navigate(['/summary']);
  }
}

