import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

///// Start FireStarter
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';

// Toasts
import { ToastService } from './ui/toast-messages/shared/toast.service';
import { ToastMessagesComponent } from './ui/toast-messages/toast-messages.component';

// Custom Pipes
import { ReversePipe } from './shared/pipes/reverse.pipe';

// Users
import { AuthService } from './core/auth.service';
import { AuthGuard} from './core/auth.guard';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserFormComponent } from './users/user-form/user-form.component';

// Navigation
import { NavService } from './ui/shared/nav.service';
import { TopNavComponent } from './ui/top-nav/top-nav.component';
import { FooterNavComponent } from './ui/footer-nav/footer-nav.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

// Translations
import { TranslationService } from './translations/shared/translation.service';
import { TranslationsListComponent } from './translations/translations-list/translations-list.component';
import { TranslationFormComponent } from './translations/translation-form/translation-form.component';
import { TranslationDetailComponent } from './translations/translation-detail/translation-detail.component';

// Posts
import { PostService } from './posts/shared/post.service';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';

// Mistakes
import { MistakeService } from './mistakes/shared/mistake.service';
import { MistakesListComponent } from './mistakes/mistakes-list/mistakes-list.component';
import { MistakeFormComponent } from './mistakes/mistake-form/mistake-form.component';
import { MistakeDetailComponent } from './mistakes/mistake-detail/mistake-detail.component';

// Feedback Page
import { FeedbackService } from './static-pages/feedback-page/shared/feedback.service';
import { FeedbackListComponent } from './static-pages/feedback-page/feedback-list/feedback-list.component';
import { FeedbackFormComponent } from './static-pages/feedback-page/feedback-form/feedback-form.component';
import { FeedbackDetailComponent } from './static-pages/feedback-page/feedback-detail/feedback-detail.component';

// Static Pages
import { SupportPageComponent } from './static-pages/support-page/support-page.component';
import { ReadmePageComponent } from './static-pages/readme-page/readme-page.component';
import { AddBookmarkPageComponent } from './static-pages/add-bookmark-page/add-bookmark-page.component';

export const firebaseConfig = environment.firebaseConfig;

///// End FireStarter
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    FooterNavComponent,
    UserFormComponent,
    LoadingSpinnerComponent,
    ReadmePageComponent,
    PostDetailComponent,
    PostFormComponent,
    PostsListComponent,
    TranslationFormComponent,
    TranslationsListComponent,
    TranslationDetailComponent,
    MistakesListComponent,
    MistakeFormComponent,
    MistakeDetailComponent,
    ReversePipe,
    FeedbackListComponent,
    FeedbackFormComponent,
    FeedbackDetailComponent,
    SupportPageComponent,
    AddBookmarkPageComponent,
    ToastMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NavService,
    TranslationService,
    PostService,
    MistakeService,
    FeedbackService,
    ToastService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
