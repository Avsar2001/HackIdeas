import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdeaCardComponent } from './components/idea-card/idea-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    IdeaCardComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IdeaCardComponent,
    SpinnerComponent
  ],
  providers: [
    IdeaCardComponent
  ]
})
export class SharedModule { }
