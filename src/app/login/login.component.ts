import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ServerService} from '../../server.service';
import {HttpErrorResponse} from '@angular/common/http';

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

  constructor(private authService: AuthService, private router: Router, private server: ServerService) { }

  ngOnInit() {
    console.log( localStorage.getItem('token'));
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/game']);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.username;
    this.user.password = this.signupForm.value.password;
    console.log(this.user.username);
    console.log(this.user.password);

    // console.log(this.signupForm);
    this.authService.login(this.user.username, this.user.password).subscribe(
      (response) => {
        this.authService.loggedIn = true;
        this.router.navigate(['/game']);
      } ,
      (error: HttpErrorResponse) => {
        console.log(error);
        this.inputError = !this.inputError;
        this.httpMessage.bold = error.status.toString();
        this.httpMessage.text = error.error.error_message;
      }
    );
  }
}
