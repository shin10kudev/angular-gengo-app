import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { FeedbackListComponent } from './ui/feedback-page/feedback-list/feedback-list.component';
import { TranslationsListComponent } from './translations/translations-list/translations-list.component';
import { MistakesListComponent } from './mistakes/mistakes-list/mistakes-list.component';

const routes: Routes = [
  // root
  { path: '', component: ReadmePageComponent },

  // users & sessions
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },

  // features
  { path: 'phrases', component: TranslationsListComponent, canActivate: [AuthGuard]},
  { path: 'mistakes', component: MistakesListComponent, canActivate: [AuthGuard]},
  { path: 'posts', component: PostsListComponent, canActivate: [AuthGuard]},

  // Other
  { path: 'feedback', component: FeedbackListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
