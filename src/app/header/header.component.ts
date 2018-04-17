import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SocialLoginService} from 'ngx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent  {
  constructor(public auth: AuthService, private router: Router, private toastr: ToastrService, private _service: SocialLoginService) {}
  logout() {
    if (this.auth.loginSocial) {
      this.logoutSocial();
      return;
    }
    this.auth.logoutRemoveToken();
    this.toastr.success('You have succesfully logged out');
    this.router.navigate(['/login']);
  }

  logoutSocial(): void {
    this._service.logout().subscribe({
      complete: () => console.log('Logout success'),
      error: err => console.log(err)
    });
  }

}
