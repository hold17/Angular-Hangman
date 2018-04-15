import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent  {
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}
  logout() {
    this.auth.logoutRemoveToken();
    this.toastr.success('You have succesfully logged out')
    this.router.navigate(['/login']);
  }

}
