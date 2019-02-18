import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

import { AppRoutingModule } from './app-routing.module';
import { CountdownModule } from 'ngx-countdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { MemberComponent } from './member/member.component';
import { AutofocusDirective } from './autofocus.directive';
import { TimerDirective } from './timer.directive';
import { MissingComponent } from './missing/missing.component';
import { ScannerComponent } from './scanner/scanner.component';

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    ProductComponent,
    MemberComponent,
    AutofocusDirective,
    TimerDirective,
    MissingComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountdownModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'id' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
