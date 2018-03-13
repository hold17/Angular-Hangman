import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logoutRemoveToken();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    console.log(this.auth.loggedIn);
    if (this.auth.isAuthenticated() && this.auth.loggedIn) {
      this.logout();
    }
  }
}
