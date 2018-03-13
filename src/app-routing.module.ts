import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './app/login/login.component';
import {WordComponent} from './app/word/word.component';
import {AuthguardService as AuthGuard} from './authguard.service';
import {HighscoreComponent} from './app/highscore/highscore.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'highscores', component: HighscoreComponent},
  {path: 'game',
    component: WordComponent,
    canActivate: [AuthGuard]},
  {path: '404', component: LoginComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
