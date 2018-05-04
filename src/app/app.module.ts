import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
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
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
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
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000
    }) // ToastrModule added
  ],
  // Alle mine services ligger her da der ikke er nogen service som udelukkende bliver anvendt et sted
  providers: [AuthguardService, AuthService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
