import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SenderComponent } from './sender.component';
import { MatSelectModule } from '@angular/material/select';
   
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { MatCardModule } from '@angular/material/card';
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
    MatDividerModule,
    MatCardModule
    ],
  providers: [],
  exports:[
    SenderComponent
  ]
})
export class SenderModule { }