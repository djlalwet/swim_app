import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { CookieService } from 'ngx-cookie';
import { Event, EventResult, EventListService }  from '../event-list.service';
import { UserService } from '../user.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  event: Event;
  user;
  setBackground: string;
  subscription: Subscription;
  routeSubscription: Subscription;
  result: EventResult;
  raceTime = {hour:0, min:0};
  registered = false;
  payment = {
    name: "",
    no: "",
    cvv: "",
    expiry: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EventListService,
    private _cookieService:CookieService,
    private _userService:UserService) {
      this.event = new Event(0, "no event", "", "", new Date(), "");
      this.user = _cookieService.getObject("user");
      this.subscription = this._userService.getUserSubjectAsObservable().subscribe(() => {
        this.user = this._cookieService.getObject("user");
      });
  }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.routeSubscription = this.route.params.switchMap((params: Params) => this.service.getEventPromise(+params['id']))
        .subscribe((event: Event) => {
          this.event = event;
          if(this.user){
            this.result = this.service.getEventParticipant(this.event.id - 1, this.user.email)
            this.result ? this.raceTime = this.getRaceTime() : null;
          }
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  getRaceTime(){
    var time = {
      hour: this.result.end.hour - this.result.start.hour,
      min:  this.result.end.min - this.result.start.min,
    }

    if (time.min < 0) {
      time.min += 60;
      time.hour--;
    }
    return time;
  }

  eventRegistration(){
    this.registered = true;
  }

}
