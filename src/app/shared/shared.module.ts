import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeaCardComponent } from './components/idea-card/idea-card.component';

@NgModule({
  declarations: [
    IdeaCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IdeaCardComponent
  ]
})
export class SharedModule { }
