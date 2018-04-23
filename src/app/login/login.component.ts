import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Provider, SocialLoginService} from 'ngx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  submitted = false;
  inputError: boolean;
  user = {
    username: '',
    password: ''
  };
  httpMessage = {
    bold: '',
    text: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private _service: SocialLoginService) { }

  ngOnInit() {
    // console.log( localStorage.getItem('token'));
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/game']);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.username;
    this.user.password = this.signupForm.value.password;
    // console.log(this.user.username);
    // console.log(this.user.password);

    // console.log(this.signupForm);
    this.authService.login(this.user.username, this.user.password).subscribe(
      (response) => {
        this.submitted = false;
        this.authService.loggedIn = true;
        this.router.navigate(['/game']);
        this.toastr.success('You have succesfully logged in');
      } ,
      (error: HttpErrorResponse) => {
        this.submitted = false;
        console.log(error);
        this.inputError = !this.inputError;
        this.httpMessage.bold = error.status.toString();
        this.httpMessage.text = error.error.error_message;
      }
    );
  }

  loginWithFacebook(): void {
    this._service.login(Provider.FACEBOOK).subscribe(user => {
      console.log(user);
      this.authService.loginSocial = true;
      this.router.navigate(['/game']);
      this.toastr.success('You have succesfully logged in');
    }, (error => {
      console.log(error);
      this.toastr.error('Something with Facebook authentication went wrong');

    } ));

  }

  loginWithGoogle(): void {
    console.log('login with google attempt');
    this._service.login(Provider.GOOGLE).subscribe(user => {
      console.log(user);
      this.authService.loginSocial = true;
      this.router.navigate(['/game']);
      this.toastr.success('You have succesfully logged in');
    }, error => {
      console.log(error);
      this.toastr.error('Something with Google authentication went wrong');
    } );

  }
}
