import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfolioDetailComponent } from './pages/portfolio/portfolio-detail/portfolio-detail.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { TermsComponent } from './pages/terms/terms.component';

import { AdminGuard } from './services/guards/admin-guard/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'splash', component: SplashComponent },
      { path: 'about', component: AboutComponent },
      { path: 'admin', component: AdminComponent, canActivate: [ AdminGuard ] },
      { path: 'reviews', component: ProductsComponent },
      { path: 'reviews/:id', component: ProductDetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'johnson-huynh', children: [
        {
          path: '',
          component: PortfolioComponent
        },
        {
          path: 'works/:id',
          component: PortfolioDetailComponent
        }
       ]
      },
      { path: 'privacy', component: PrivacyComponent },
      { path: '', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'trends', component: TrendsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
