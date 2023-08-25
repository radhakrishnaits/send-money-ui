import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecieverComponent } from './reciever/reciever.component';
import { SenderComponent } from './sender/sender.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/sender', pathMatch: 'full' },
  { path: 'reciever', component: RecieverComponent },
  { path: 'sender' , component: SenderComponent},
  { path: 'summary' , component: SummaryPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
