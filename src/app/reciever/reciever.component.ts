import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import Validation from '../utils/validation';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reciever',
  templateUrl: './reciever.component.html',
  styleUrls: ['./reciever.component.scss']
})
export class RecieverComponent implements OnInit {
  ifscCode: any = [];

  recieverForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    accountNumber: new FormControl(''),
    cAccountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    bankName: new FormControl({ disabled: true }),
    branchName: new FormControl({ disabled: true }),
  });

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
    private httpService: HttpService, private router: Router) {
    this.recieverForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accountNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14)
      ]],
      cAccountNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14)])
      ],
      ifscCode: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern('[A-Za-z]{4}[A-Z0-9a-z]{6,7}$')  //^[A-Za-z]{4}[0-9]{6,7}$

      ]],
      bankName: [''],
      branchName: [''],
    },
      {
        validators: [Validation.match('accountNumber', 'cAccountNumber')],
      }
    )
  }



  ngOnInit(): void {
    this.ifscCode = this.dataService.getIfscCode();
    console.log(this.ifscCode);
  }

  get reciever(): { [key: string]: AbstractControl } {
    return this.recieverForm.controls;
  }

  onIfscCodeCheck(event: any) {
    let filterdBank = [];
    const inpIfsc = event.target.value;
    if (inpIfsc) {
      filterdBank = this.ifscCode.find((item: any) => item.ifsc.toLowerCase() === inpIfsc.toLowerCase())
      if (filterdBank) {
        console.log(filterdBank);
        this.reciever['bankName'].setValue(filterdBank.bank);
        this.reciever['branchName'].setValue(filterdBank.branch);
      } else {
        this.reciever['bankName'].setValue('');
        this.reciever['branchName'].setValue('');
      }
    }
  }

  searchIfscCode() { }

  onAccountConfimation() {
    let accountNumber = this.recieverForm.controls['accountNumber'].value;
    this.dataService.setAccountDetails(accountNumber);
  }

  onFormSubmit(formData: any) {

    delete formData.cAccountNumber;
    delete formData.bankName;
    delete formData.branchName;
    formData['country'] = "India";
    formData['senderID'] = 0;
    formData['status'] = "success";

    console.log(formData);
    this.dataService.reciever = formData; // for set
    console.log('-------------------');
    console.log(this.dataService.reciever);   // for get
    
    this.httpService.postRecieverDetails(formData).subscribe(
      (response) => {
        console.log('Response from backend:', response);
        this.navigateToCard();
        // Handle the response from the backend if needed
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle errors if needed
      }
    );
  }

  navigateToCard() {
    this.router.navigate(['/card']);
  }
}
