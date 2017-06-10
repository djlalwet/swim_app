import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User, UserService }  from '../user.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  info;
  showUpdatePassword: boolean;
  showWarnings = false;
  showSuccess = false;
  newPassword = {
    current: '',
    new: '',
    check: '',
    isNew: function(){
      return this.current != this.new;
    },
    isValid: function(){
      return this.new === this.check;
    }
  };

  constructor(
    private _cookieService: CookieService,
    private _userService: UserService,
    private router: Router) {
      this.showUpdatePassword = false;
      this.user = _cookieService.getObject('user');
      this.info = this.user? this.user : new User(0, '','','','',false,false);
      if(!this.user){
        this.router.navigateByUrl('/home');
      }
  }

  ngOnInit() {
  }

  update(){
    if(this.showUpdatePassword){
      if(!this.newPassword.isNew() || !this.newPassword.isValid() || (this.newPassword.current != this.user.password)){
        this.showWarnings = true;
        this.showSuccess = false;
        return;
      }
      this.info.password = this.newPassword.new;
      this.showWarnings = false;
    }
    this._userService.updateUserByEmail(this.info);
    this._cookieService.remove('user');
    this._cookieService.putObject('user', this.info);
    this._userService.getUserSubject().next();
    this.showSuccess = true;
    this.showUpdatePassword = false;
  }

  updatePassword(){
    this.showUpdatePassword = true;
  }

}
