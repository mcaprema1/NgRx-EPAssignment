import { NgModule } from '@angular/core';
import { LibStoreComponent } from './lib-store.component';
import { StoreModule } from '@ngrx/store';
import { empReducer } from '../../../lib-store/src/lib/reducers/emp.reducer';
import { EffectsModule } from '@ngrx/effects';
import {EmployeeEffects } from '../lib/effects/emp.effects'
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    LibStoreComponent
  ],
  imports: [ 
    StoreModule.forRoot({
      empStore: empReducer}),
    EffectsModule.forRoot([EmployeeEffects]),
  ],
  exports: [
    LibStoreComponent
  ],
  providers :[ApiService]
})
export class LibStoreModule { }
