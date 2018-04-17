import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WordComponent} from './word/word.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {AuthguardService} from '../authguard.service';
import {AuthService} from '../auth.service';
import {HighscoreComponent} from './highscore/highscore.component';
import {ServerService} from '../server.service';
import {HeaderComponent} from './header/header.component';
import {LoadingModule} from 'ngx-loading';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxSocialLoginModule} from 'ngx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    LoginComponent,
    HighscoreComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000
    }), // ToastrModule added
    NgxSocialLoginModule.init(
      {
        google: {
          client_id: '338848784521-21vinh818t9ac92t04c34489tsdigbqv.apps.googleusercontent.com'
        },
        facebook: {
          initOptions: {
            appId: '2120729694880521'
          }
        }
      }
    )
  ],
  providers: [AuthguardService, AuthService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
