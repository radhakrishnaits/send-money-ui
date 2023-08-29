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
      nameOnCard: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(16)]],
      cardExpiry: ['', Validators.required],
      ccv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
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

    // this.httpService.postCardDetails(formData).subscribe(
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

  navigateToSummary() {
    this.router.navigate(['/summary']);
  }
}

