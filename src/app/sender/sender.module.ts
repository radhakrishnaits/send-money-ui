import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SenderComponent } from './sender.component';
import { MatAutocompleteModule, MatButtonModule, MatDividerModule, MatIconModule,
   MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
   SenderComponent
    ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatDividerModule
    ],
  providers: [],
  exports:[
    SenderComponent
  ]
})
export class SenderModule { }