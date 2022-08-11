import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Ckeditor5Component } from './ckeditor5/ckeditor5.component';

@NgModule({
  declarations: [AppComponent, Ckeditor5Component],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
