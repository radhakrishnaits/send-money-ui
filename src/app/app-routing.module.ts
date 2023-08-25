import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecieverComponent } from './reciever/reciever.component';

const routes: Routes = [
  { path: '', redirectTo: '/reciever', pathMatch: 'full' },
  { path: 'reciever', component: RecieverComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
