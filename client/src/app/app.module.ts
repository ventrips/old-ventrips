import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AboutComponent } from './pages/about/about.component';
import { CategoryComponent } from './pages/category/category.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorNotFoundComponent } from './shared/errors/error-not-found/error-not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { TermsComponent } from './pages/terms/terms.component';
import { BlogComponent } from './pages/blog/blog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    CategoryComponent,
    ContactComponent,
    ErrorNotFoundComponent,
    PortfolioComponent,
    ProductsComponent,
    ProductDetailComponent,
    PrivacyComponent,
    TermsComponent,
    TrendsComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
