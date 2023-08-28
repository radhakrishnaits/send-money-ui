
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm, FormControl, AbstractControl } from '@angular/forms';  
import { RecieverService } from '../services/reciever.service';

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

  constructor(private formBuilder: FormBuilder, private recieverService: RecieverService,
    private router: Router) {
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
    console.log(formData);
    if (this.cardForm.valid) {
      this.navigateToSummary();
    }
    // delete formData.cAccountNumber;
    // delete formData.bankName;   
    // delete formData.branchName;
    // formData['country'] = "India";
    // formData['senderID'] = 0;
    // formData['status'] = "success";

    // console.log(formData); 
    // this.recieverService.reciever = formData; // for set
    // console.log('-------------------');  
    // console.log(this.recieverService.reciever);   // for get
    // this.recieverService.postRecieverDetails(formData).subscribe(
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

