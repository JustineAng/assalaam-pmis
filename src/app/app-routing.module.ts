import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { MemberComponent } from './member/member.component';
import { MissingComponent } from './missing/missing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent, data: {json: null} },
  { path: 'product/:id', component: ProductComponent, data: {json: null} },
  { path: 'member', component: MemberComponent },
  { path: 'member/:id', component: MemberComponent },
  { path: 'missing', component: MissingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
