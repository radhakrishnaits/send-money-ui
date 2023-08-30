import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecieverComponent } from './reciever/reciever.component';
import { SenderComponent } from './sender/sender.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  { path: '', redirectTo: '/sender', pathMatch: 'full' },
  { path: 'receiver', component: RecieverComponent },
  { path: 'sender' , component: SenderComponent},
  { path: 'summary' , component: SummaryPageComponent},
  { path: 'card' , component: CardComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
