import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { CookieService } from 'ngx-cookie';
import { User, UserService }  from '../user.service';
import { EventListService }  from '../event-list.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  input = {
    email: "",
    password: ""
  };

  user;
  eventList;
  userLoggedIn: boolean = false
  invalidInput: boolean = false;
  subscription: Subscription;


  constructor(
    private _userService: UserService,
    private _eventService: EventListService,
    private router: Router,
    private _cookieService:CookieService) {
      this.eventList = this._eventService.getEvents();
      this.user = _cookieService.getObject("user");
      this.userLoggedIn = this.user? true : false;
      this.subscription = this._userService.getUserSubjectAsObservable().subscribe(() => {
        this.user = this._cookieService.getObject("user");
      });
    }

  ngOnInit() {
    $("input[name='email']").val("");
    $("input[name='password']").val("");
    $('body').on('click', function(event){
      if($('#invalidLogIn').hasClass('in')){
        $('#invalidLogIn').collapse("hide");
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearInvalidInput(){
    this.invalidInput = false;
  }


  validate(event){
    this.user = this._userService.getUserByEmail(this.input.email);

    if(this.user && this.user.password === this.input.password){
      this.userLoggedIn = true;
      this.clearInvalidInput();
      this.router.navigateByUrl('/home');
      this._cookieService.putObject("user", this.user);
    }else {
      // show failed login
      this.userLoggedIn = false;
      this.input = {
        email: "",
        password: ""
      };
      $('#invalidLogIn').collapse("show");
    }
  }

  logout(){
    this.user = null;
    this.userLoggedIn = false;
    this.input = {
      email: "",
      password: ""
    };
    this._cookieService.removeAll();
  }
}
