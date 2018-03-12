import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ServerService} from '../../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  submitted = false;
  passWordError: false;
  user = {
    username: '',
    password: ''
  };


  anyError: false;

  constructor(private authService: AuthService, private router: Router, private server: ServerService) { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log('submitted');
  //   console.log(form);
  //
  // }
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.username;
    this.user.password = this.signupForm.value.password;
    console.log(this.user.username);
    console.log(this.user.password);

    // console.log(this.signupForm);
    this.authService.login(this.user.username, this.user.password).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/game']);
    }
  }
}
