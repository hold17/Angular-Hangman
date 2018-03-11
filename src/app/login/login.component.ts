import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  passWordError: false;


  anyError: false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log('submitted');
  //   console.log(form);
  //
  // }
  onSubmit() {
    console.log(this.signupForm);
    this.authService.login();
    this.router.navigate(['/game']);
  }
}
