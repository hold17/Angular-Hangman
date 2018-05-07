import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GameComponent} from './core/game/game.component';
import {AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import {HighscoreComponent} from './core/highscore/highscore.component';


const appRoutes: Routes = [
  {path: 'highscores', component: HighscoreComponent},
  {path: 'game',
    component: GameComponent,
    canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
