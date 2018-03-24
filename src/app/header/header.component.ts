import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent  {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logoutRemoveToken();
    this.router.navigate(['/login']);
  }

}
