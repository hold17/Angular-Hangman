import {Component, TemplateRef} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router, private toastr: ToastrService,
              private modalService: BsModalService) {}
  name: string;
  modalRef: BsModalRef;
  // forcedLogoutModalRef: BsModalRef;

  // laver en observable til at tjekke den token vi bruger
  observeToken = new Observable((observer) => {
    observer.next(localStorage.getItem('token'));
    observer.complete();
  });
  logout() {
    this.auth.logoutRemoveToken();
    this.auth.loggedIn = false;
    this.toastr.success('You have succesfully logged out');
    this.router.navigate(['/login']);
    this.modalRef.hide();
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
