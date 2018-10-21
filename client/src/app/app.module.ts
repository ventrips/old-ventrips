import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './pages/splash/splash.component';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorNotFoundComponent } from './shared/errors/error-not-found/error-not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { TermsComponent } from './pages/terms/terms.component';
import { BlogComponent } from './pages/blog/blog.component';

import { AuthService } from './services/firebase/auth/auth.service';
import { ProductsService } from './services/firebase/products/products.service';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchByPipe } from './pipes/search-by/search-by.pipe';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { EditModeComponent } from './shared/edit-mode/edit-mode.component';
import { EditModalComponent } from './shared/edit-mode/edit-modal/edit-modal.component';
import { ConfirmModalComponent } from './shared/edit-mode/confirm-modal/confirm-modal.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // {
    //   requireDisplayName: false,
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    // },
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'https://ventrips.com/terms',
  privacyPolicyUrl: 'https://ventrips.com/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ErrorNotFoundComponent,
    PortfolioComponent,
    ProductsComponent,
    ProductDetailComponent,
    PrivacyComponent,
    TermsComponent,
    TrendsComponent,
    BlogComponent,
    OrderByPipe,
    SearchByPipe,
    AdminComponent,
    LoginComponent,
    EditModeComponent,
    EditModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFirestoreModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [
    ProductsService,
    AuthService
  ],
  entryComponents: [
    EditModalComponent,
    ConfirmModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
