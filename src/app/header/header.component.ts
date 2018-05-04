import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private toastr: ToastrService,
              private modalService: BsModalService) {}
  name: string;
  modalRef: BsModalRef;
  sessionExpired = false;
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown = false;
  // laver en observable til at tjekke den token vi bruger, det skal bruges til at sætte navnet for brugeren
  observeToken = new Observable((observer) => {
    observer.next(localStorage.getItem('token'));
    observer.complete();
  });
  showModal(): void {
    this.isModalShown = true;
  }
  onHidden(): void {
    this.isModalShown = false;
    this.logout();
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

  ngOnInit(): void {
    // Når man har været på siden i et stykke tid, her skal den automatisk foreslå at du logger ud når din session løber ud
    TimerObservable.create(9000, 10000).subscribe(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
        this.auth.validate(token).subscribe((response) => {}, (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 401 && this.auth.loggedIn) {
            this.showModal();
            this.sessionExpired = true;
          }
        });
        }
      }
    );
  }
}
