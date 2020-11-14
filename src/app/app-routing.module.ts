import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablishmentsComponent } from './pages/establishments/establishments.component';
import { EstablishmentEditComponent } from './pages/establishment-edit/establishment-edit.component';

const routes: Routes = [
  { path: '', component: EstablishmentsComponent },
  { path: 'edit/:id', component: EstablishmentEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
