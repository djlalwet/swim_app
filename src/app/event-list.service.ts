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
  new Event(1, "Resurrect Pasig", "../../assets/event1.jpg", "Pasig City, Metro Manila", new Date(2018, 1, 17, 8,),
  "We're no strangers to love, You know the rules and so do I ,A full commitment's what I'm thinking of, You wouldn't get this from any other guy, I just want to tell you how I'm feeling, Gotta make you understand (Paragraph 13.5.8)"),
  new Event(2, "Explore Cebu", "../../assets/event2.jpg", "Cebu City, Cebu", new Date(2018, 2, 27, 8),
  "We've known each other for so long, Your heart's been aching but you're too shy to say it, Inside we both know what's been going on, We know the game and we're gonna play it, And if you ask me how I'm feeling, Don't tell me you're too blind to see (Paragraph 13.5.7)"),
  new Event(3, "Conquer Corregidor", "../../assets/event3.jpg", "Balanga City, Bataan", new Date(2018, 4, 9, 8),
  "						Never gonna give you up, never gonna let you down, Never gonna run around and desert you, Never gonna make you cry, never gonna say goodbye, Never gonna tell a lie and hurt you (Paragraph 13.5.6)")
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
