import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService }  from '../user.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  info = {
    firstname: '',
    lastname: '',
    email: '',
    emailCheck: '',
    password: '',
    passwordCheck: '',
    newsLetter: true,
    notifications: true
  };
  showWarnings = false;
  validEmail = true;
  validPassword = true;
  userCount = 100;

  constructor(
    public router: Router,
    public _userService: UserService) { }

  ngOnInit() {
  }

  register(info){
    (info.password != info.passwordCheck)? this.clearPassword() : this.validPassword=true;
    (info.email != info.emailCheck)? this.clearEmail() : this.validEmail=true;

    if(this._userService.getUserByEmail(info.email)){
      this.validEmail = false;
      this.clearEmail();
    }

    if(this.validEmail && this.validPassword){
      this.showWarnings = false;
      this.router.navigateByUrl('/home');
      this.userCount++;
      this._userService.addUser(
        new User(
          this.userCount,
          info.firstname,
          info.lastname,
          info.email,
          info.password,
          info.newsletter,
          info.notifications))
    }
  }

  clearPassword(){
      this.validPassword = false;
      this.showWarnings = true;
      $("input[name='password']").val("");
      $("input[name='passwordCheck']").val("");
  }

  clearEmail(){
      this.validEmail = false;
      this.showWarnings = true;
      $("input[name='email']").val("");
      $("input[name='emailCheck']").val("");
  }
}
