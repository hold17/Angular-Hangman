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
  passWordError: false;
  username: string;
  password: string;


  anyError: false;

  constructor(private authService: AuthService, private router: Router, private server: ServerService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log('submitted');
  //   console.log(form);
  //
  // }
  onSubmit(form: NgForm) {
    console.log(form.valid);
    console.log(this.username);
    console.log(this.password);

    // console.log(this.signupForm);
    this.authService.login(this.username, this.password).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/game']);
    }
  }
}
