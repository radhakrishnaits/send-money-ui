import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm, FormControl, AbstractControl } from '@angular/forms';  
import { RecieverService } from '../services/reciever.service';
import Validation from '../utils/validation';

@Component({
  selector: 'app-reciever',
  templateUrl: './reciever.component.html',
  styleUrls: ['./reciever.component.scss']
})
export class RecieverComponent implements OnInit {
  ifscCode: any = [];

  recieverForm: FormGroup  = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    accountNumber: new FormControl(''),
    cAccountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    bankName: new FormControl(''),
    branchName: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private recieverService: RecieverService) {
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
      this.ifscCode = this.recieverService.getIfscCode();
      console.log(this.ifscCode);
  }

  get reciever(): { [key: string]: AbstractControl } {
    return this.recieverForm.controls;
  }

  onIfscCodeCheck(event:any){
      let filterdBank = [];
      const inpIfsc = event.target.value;
      if(inpIfsc) {
        filterdBank =  this.ifscCode.find((item:any) => item.ifsc.toLowerCase() === inpIfsc.toLowerCase())
        if(filterdBank) {
          console.log(filterdBank);
          this.reciever['bankName'].setValue(filterdBank.bank);
          this.reciever['branchName'].setValue(filterdBank.branch);
        } else {
          this.reciever['bankName'].setValue('');
          this.reciever['branchName'].setValue('');
        }
      }
  }

  searchIfscCode() {}

  

  onFormSubmit(formData: NgForm) {  
    console.log(formData);  
    this.recieverService.reciever = formData; // for set
    console.log('-------------------');  
    console.log(this.recieverService.reciever);   // for get
  } 

}
