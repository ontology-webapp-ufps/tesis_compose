import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecundaryButtonComponent } from './secundary-button/secundary-button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    InputComponent,
    PrimaryButtonComponent,
    SecundaryButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    PrimaryButtonComponent,
    SecundaryButtonComponent
  ],
})
export class SharedModule {}
