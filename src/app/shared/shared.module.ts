import {NgModule} from '@angular/core';
import {LoadingModule} from 'ngx-loading';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [LoadingModule, AngularFontAwesomeModule,
    // required animations module
    BrowserAnimationsModule,
    ToastrModule.forRoot({ // ToastrModule added
    timeOut: 2000
  })],
  exports: [LoadingModule, AngularFontAwesomeModule, CommonModule],
})
export class SharedModule {}
