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
import { LoadingModule } from 'ngx-loading';
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
    LoadingModule
  ],
  providers: [AuthguardService, AuthService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
