import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private toastr: ToastrService) {}
  name: string;
  isModalShown: boolean;
  // laver en observable til at tjekke den token vi bruger, det skal bruges i setName i denne klasse.
  observeToken;
  ngOnInit(): void {
    this.isModalShown = false;
    this.observeToken = new Observable((observer) => {
      observer.next(localStorage.getItem('token'));
      observer.complete();
    });
    // Når man har været på siden i et stykke tid, her vil den automatisk vise en modal, som logger dig ud ved klik.
    TimerObservable.create(9000, 10000).subscribe(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
          this.auth.validate(token).subscribe(() => {}, (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401 && this.auth.loggedIn) {
              this.showModal();
            }
          });
        }
      }
    );
  }

  logout() {
    this.auth.logoutRemoveToken();
    this.auth.loggedIn = false;
    this.toastr.success('You have succesfully logged out');
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/game']);
  }

  setName() {
    if (this.auth.loggedIn) {
      // sætter name property til at være JSON objectets first name
      this.observeToken.subscribe((res: string) => {
        const tokenObj = JSON.parse(res);
        this.name = tokenObj.user.firstname;
      });
      return true;
    }
  }
  showModal(): void {
    this.isModalShown = true;
  }
  onHidden(): void {
    this.isModalShown = false;
    this.logout();
  }
}
