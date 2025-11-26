import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToasterModule } from '../../../src/toaster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ToasterModule, BrowserAnimationsModule, FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
