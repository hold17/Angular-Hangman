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

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    LoginComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthguardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
