import {NgModule} from '@angular/core';
import {HighscoreComponent} from './highscore/highscore.component';
import {AppRoutingModule} from '../app-routing.module';
import {GameComponent} from './game/game.component';
import {SharedModule} from '../shared/shared.module';
import {GameServerService} from './game-server.service';

@NgModule({
  declarations: [
    HighscoreComponent,
    GameComponent,
  ],
  imports: [AppRoutingModule, SharedModule],
  providers: [GameServerService]
})
export class CoreModule {

}
