import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private toastr: ToastrService) {}
  name: string;
  // laver en observable til at tjekke den token vi bruger
  observeToken = new Observable((observer) => {
    observer.next(localStorage.getItem('token'));
    observer.complete();
  });
  logout() {
    this.auth.logoutRemoveToken();
    this.toastr.success('You have succesfully logged out');
    this.router.navigate(['/login']);
  }

    goHome() {
      this.router.navigate(['/game']);
  }

  ngOnInit(): void {
    // sætter name property til at være JSON objectets first name
    this.observeToken.subscribe((res: string) => {
      const tokenObj = JSON.parse(res);
      this.name = tokenObj.user.firstname;
    });
  }
}
