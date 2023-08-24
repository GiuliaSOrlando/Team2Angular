import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ExperienceComponent } from './Components/experience/experience.component';
import { PostComponent } from './Components/post/post.component';
import { ResourcesComponent } from './Components/resources/resources.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'post', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
