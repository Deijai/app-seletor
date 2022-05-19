import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { SeletorComponent } from './pages/seletor/seletor.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [SeletorComponent],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaisesModule { }
