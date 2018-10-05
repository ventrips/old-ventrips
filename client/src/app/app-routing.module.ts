import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CategoryComponent } from './pages/category/category.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'products',
        children: [
          { path: '', component: ProductsComponent },
          { path: ':category',
            children: [
              { path: '', component: CategoryComponent },
              { path: ':id', component: ProductDetailComponent }
            ]
          }
        ]
      },
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
