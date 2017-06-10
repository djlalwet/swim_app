import { Component, OnInit } from '@angular/core';
import { Event, EventListService } from '../event-list.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imagePath: String = './assets/test.jpg';
  events =[];
  eventId : number;

  constructor(
    public _eventListService: EventListService) {
      this.eventId = 0;
      this.events = _eventListService.getEvents();
    $('.item').on('mouseover', function(event){
      $('#eventsCarousel').carousel('pause');
    });

    $('.item').on('mouseleave', function(event){
      $('#eventsCarousel').carousel('cycle');
    });
  }

  ngOnInit() {
  }
}
