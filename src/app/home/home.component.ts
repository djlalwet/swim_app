import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'ngx-cookie';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { homeAnimations } from './home.component.animations';
import { User, UserService }  from '../user.service';
import { Event, EventListService } from '../event-list.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: homeAnimations
})
export class HomeComponent implements OnInit {
  imagePath: String = './assets/test.jpg';
  user;
  events =[];
  eventId : number;
  logoState: String = 'show';
  eventListState: String = 'hide';
  userLoggedIn: boolean = false
  subscription: Subscription;

  constructor(
    private _userService: UserService,
    public _eventListService: EventListService,
    public router: Router,
    private _cookieService:CookieService) {
      this.eventId = 0;
      this.events = _eventListService.getEvents();
      this.user = _cookieService.getObject("user");
      this.userLoggedIn = this.user? true : false;
      this.subscription = this._userService.getUserSubjectAsObservable().subscribe(() => {
        this.user = this._cookieService.getObject("user");
      });
  }

  ngOnInit() {
    $(document).keydown((e) => {
      this.scroll(e);
      $("body").trigger("click");
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    $(document).off();
  }

  checkKey(event){
    this.scroll(event);
  }

  scroll(event){
    if ((event.deltaY > 0) || (event.key == "ArrowDown")){
      this.scrollDown();
    }else if((event.deltaY < 0) ||  (event.key == "ArrowUp")){
      this.scrollUp();
    }
  }

  scrollUp(){
    this.logoState = 'show';
    this.eventListState = 'hide';
  }

  scrollDown(){
    this.logoState = 'hide';
    this.eventListState = 'show';
  }

  showProfile(){
    this.user = this._cookieService.getObject("user");
    let route  = this.user? '/profile' : '/registration';
    this.router.navigateByUrl(route);
  }
}
