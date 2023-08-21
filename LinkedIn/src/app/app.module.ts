import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersInterceptor } from './users.interceptor';
import { FormsModule } from '@angular/forms';
import { TestUpdateComponent } from './pages/test-update/test-update.component';

@NgModule({
  declarations: [AppComponent, ProfileComponent, NavbarComponent, TestUpdateComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
