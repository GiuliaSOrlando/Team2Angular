import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersInterceptor } from './users.interceptor';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceComponent } from './Components/experience/experience.component';
import { AsideComponent } from './Components/aside/aside.component';
import { PostComponent } from './Components/post/post.component';
import { ResourcesComponent } from './Components/resources/resources.component';
import { CommentsComponent } from './Components/comments/comments.component';
import { CommentsInterceptor } from './comments.interceptor';
import { CommentsService } from './comments.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    ExperienceComponent,
    AsideComponent,
    PostComponent,
    ResourcesComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
