import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
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
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'portfolio', component: PortfolioComponent },
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
