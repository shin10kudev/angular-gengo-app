import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/auth.guard";

// Users
import { UserLoginComponent } from "./users/user-login/user-login.component";
import { UserProfileComponent } from "./users/user-profile/user-profile.component";

// Features
import { MistakesListComponent } from "./mistakes/mistakes-list/mistakes-list.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { TranslationsListComponent } from "./translations/translations-list/translations-list.component";
import { QuestionsListComponent } from "./questions/questions-list/questions-list.component";

// Static pages
import { ReadmePageComponent } from "./static-pages/readme-page/readme-page.component";
import { FeedbackListComponent } from "./static-pages/feedback-page/feedback-list/feedback-list.component";
import { SupportPageComponent } from "./static-pages/support-page/support-page.component";
import { AddBookmarkPageComponent } from "./static-pages/add-bookmark-page/add-bookmark-page.component";

const routes: Routes = [
  // root
  { path: "", component: ReadmePageComponent },

  // users & sessions
  { path: "login", component: UserLoginComponent },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },

  // features
  {
    path: "phrases",
    component: TranslationsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mistakes",
    component: MistakesListComponent,
    canActivate: [AuthGuard]
  },
  { path: "posts", component: PostsListComponent, canActivate: [AuthGuard] },
  {
    path: "questions",
    component: QuestionsListComponent,
    canActivate: [AuthGuard]
  },

  // Other
  {
    path: "feedback",
    component: FeedbackListComponent,
    canActivate: [AuthGuard]
  },
  { path: "support", component: SupportPageComponent },
  { path: "add_gengo_app_to_homescreen", component: AddBookmarkPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
