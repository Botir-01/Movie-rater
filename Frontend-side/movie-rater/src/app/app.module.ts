import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'}
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AuthModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
