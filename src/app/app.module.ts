import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstablishmentsComponent } from './pages/establishments/establishments.component';
import { EstablishmentEditComponent } from './pages/establishment-edit/establishment-edit.component';
import { EstablishmentCardComponent } from './components/establishment-card/establishment-card.component';
import { HeaderComponent } from './layout/header/header.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    EstablishmentsComponent,
    EstablishmentEditComponent,
    EstablishmentCardComponent,
    HeaderComponent,
    MessagesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
