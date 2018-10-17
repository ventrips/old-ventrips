import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

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

import { ProductsService } from './services/firebase/products/products.service';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchByPipe } from './pipes/search-by/search-by.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    SearchByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
