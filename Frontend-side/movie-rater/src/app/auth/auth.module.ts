import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CookieService
  ]
})
export class AuthModule { }
