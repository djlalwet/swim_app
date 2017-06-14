import { Injectable } from '@angular/core';

export class Event {
  constructor(
    public id: number,
    public name: string,
    public imgSrc: string,
    public location: string,
    public date: Date,
    public description: string) { }
}

export class Time {
  constructor(
    public hour: number,
    public min: number
  ){}
}

export class EventResult {
  constructor(
    public email: string,
    public start: Time,
    public end: Time,
  ){}
}

let event1Participants = [
  new EventResult("d@d.com", new Time(8,30), new Time(9, 15)),
  new EventResult("l@j.com", new Time(8,31), new Time(9, 10))
];

let event2Participants = [
  new EventResult("l@j.com", new Time(8,30), new Time(9, 8)),
  new EventResult("k@B.com", new Time(8,35), new Time(9, 15)),
  new EventResult("s@c.com", new Time(8,32), new Time(9, 11))
];

let event3Participants = [
  new EventResult("d@d.com", new Time(8,33), new Time(9, 7)),
  new EventResult("s@c.com", new Time(8,32), new Time(9, 14))
];

let eventParticipants = [
  event1Participants,
  event2Participants,
  event3Participants,
];

let EVENTS = [
  new Event(1, "Resurrect Pasig", "./assets/event1.jpg", "Pasig City, Metro Manila", new Date(2018, 1, 17, 8,),
  "Promoting the rehabilitation of the Pasig River and in cooperation with the local Goverment, Resurrect Pasig is the first event of this years Swim 7107 triad of Open swimming events."),
  new Event(2, "Explore Cebu", "./assets/event2.jpg", "Cebu City, Cebu", new Date(2018, 2, 27, 8),
  "Cebu island boasts of pristine waters. The second Swim 7107 event raises the bar with a 2.2 km swim. "),
  new Event(3, "Conquer Corregidor", "./assets/event3.jpg", "Balanga City, Bataan", new Date(2018, 4, 9, 8),
  "Conquer Corregidor, the culminating event of this years swim 7107. Take on the challenge of swimming from bataan to corregidor and raise the flag.")
];

let eventsPromise = Promise.resolve(EVENTS);

@Injectable()
export class EventListService {

  constructor() { }

  getEventPromise(id: number | string) {
    return eventsPromise
      .then(events => events.find(event => event.id === +id));
  }

  getEvents() {
    return EVENTS;
  }

  getEventParticipant(eventId: number, inputEmail: string) {
    return eventParticipants[eventId].find((user) => user.email === inputEmail);
  }

}
