import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


import { ApiService } from '../api.service';

import { MainComponent } from './main.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

const routes: Routes = [
  {path: 'movies', component: MainComponent},
]


@NgModule({
  declarations: [MainComponent, MovieListComponent,
                MovieDetailsComponent, MovieFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ],
})
export class MainModule {}
