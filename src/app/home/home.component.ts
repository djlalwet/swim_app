import { Component, OnInit } from '@angular/core';
import { Event, EventListService } from '../event-list.service';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { homeAnimations } from './home.component.animations';

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
  events =[];
  eventId : number;
  logoState: String = 'show';
  eventListState: String = 'hide';

  constructor(
    public _eventListService: EventListService) {
      this.eventId = 0;
      this.events = _eventListService.getEvents();
  }

  ngOnInit() {
    $('.item').on('mouseover', function(event){
      $('#eventsCarousel').carousel('pause');
    });

    $('.item').on('mouseleave', function(event){
      $('#eventsCarousel').carousel('cycle');
    });

    $(document).bind('keydown', (e) => {
      console.log(e.key);
      this.scroll(e);
      return;
    });
  }

  ngOnDestroy() {
    $(document).unbind('keypress');
  }

  checkKey(event){
    console.log(event.key);
  }

  scroll(event){
    console.log("in scroll ", event.key);
    if ((event.deltaY > 0) || (event.key == "ArrowDown")){
      this.scrollDown();
    }else if((event.deltaY < 0) ||  (event.key == "ArrowUp")){
      this.scrollUp();
    }

    // this.logoState = (this.logoState === 'show' ? 'hide' : 'show');
    // this.eventListState = (this.eventListState === 'show' ? 'hide' : 'show');
  }

  scrollUp(){
    console.log("scroll Up");
    this.logoState = 'show';
    this.eventListState = 'hide';
  }

  scrollDown(){
    console.log("scroll Down");
    this.logoState = 'hide';
    this.eventListState = 'show';
  }
}
