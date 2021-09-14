import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { IdeaDetailsFormComponent } from './components/idea-details-form/idea-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    HomeLayoutComponent,
    IdeaDetailsFormComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
  ]
})
export class HomeModule { }
