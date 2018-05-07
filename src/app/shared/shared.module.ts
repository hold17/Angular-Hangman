import {NgModule} from '@angular/core';
import {LoadingModule} from 'ngx-loading';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    LoadingModule,
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ // ToastrModule added
    timeOut: 2000
  })],
  exports: [LoadingModule, AngularFontAwesomeModule, CommonModule],
})
export class SharedModule {}
