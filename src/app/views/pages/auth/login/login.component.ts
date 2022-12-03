import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsernameValidators } from './username.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: any;
  invalidLogin = false;
  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        UsernameValidators.cannotContainSpace,
      ]
      //, UsernameValidators.shouldBeUnique
      ),
      
      password: new FormControl('', Validators.required)
    })
  });

  get username(){
    return this.form.get('account.username');
  }

  get password(){
    return this.form.get('account.password');
  }

  login(credentials: any){
    //Check to see if the form is valid (no validation errors in the fields)
    if(this.form.valid){
      
    }
    else
      this.invalidLogin = true;
  } 

  
  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      //this.router.navigate([this.returnUrl]);
      this.router.navigate(['/dashboard']);
    }
  }

}
