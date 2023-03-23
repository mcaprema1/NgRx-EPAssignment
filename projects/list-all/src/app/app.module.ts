import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { empReducer } from '../../../lib-store/src/lib/reducers/emp.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibStoreModule } from 'projects/lib-store/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      LibStoreModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
