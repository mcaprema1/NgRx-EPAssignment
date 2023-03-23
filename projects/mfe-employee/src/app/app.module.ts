import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
// import { EmployeeEffects } from './effects/emp.effects';
import { StoreModule } from '@ngrx/store';
import { empReducer } from '../../../lib-store/src/lib/reducers/emp.reducer';
import { LibStoreModule } from 'projects/lib-store/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // EffectsModule.forRoot([EmployeeEffects]),
    // StoreModule.forRoot({
    //   empStore: empReducer}),
      LibStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
