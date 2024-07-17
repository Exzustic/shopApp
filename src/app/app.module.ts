import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
