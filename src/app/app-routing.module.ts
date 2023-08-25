import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecieverComponent } from './reciever/reciever.component';
import { SenderComponent } from './sender/sender.component';

const routes: Routes = [
  { path: '', redirectTo: '/sender', pathMatch: 'full' },
  { path: 'reciever', component: RecieverComponent },
  { path: 'sender' , component: SenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
