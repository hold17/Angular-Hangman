import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, DoCheck {
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
              private toastr: ToastrService) { }

  ngOnInit() {
    // console.log( localStorage.getItem('token'));
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/game']);
    }
  }
  ngDoCheck() { // Det her løser det problem den anden gruppe snakkede om med Formen der blev ved med at være rød.
    this.signupForm.valueChanges.subscribe((response) => {
      this.user = response;
    });
    if (this.user.username.length === 0 && this.user.password.length === 0 && this.signupForm.touched) {
      this.signupForm.form.controls['username'].markAsUntouched();
      this.signupForm.form.controls['password'].markAsUntouched();
    }
  }
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.username;
    this.user.password = this.signupForm.value.password;

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
  goTohighScores() {
    this.router.navigate(['/highscores']);

  }
}
