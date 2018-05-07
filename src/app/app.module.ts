import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    CoreModule,
  ],
  exports: [RouterModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
