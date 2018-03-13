import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  constructor(private auth: AuthService, private router: Router) {}
  test: 'test';
  logout() {
    this.auth.logout();
    console.log(this.auth.loggedIn);
    this.router.navigate(['/login']);
  }
}
