import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

export class User {
  constructor(public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public newsletter: boolean,
    public notifications: boolean) { }
}

let USERS = [
  new User(7, 'Dan', 'Lalwet', 'd@d.com', 'test', true, true),
  new User(23, 'Lebron', 'James', 'l@j.com', '2', true, false),
  new User(24, 'Kobe', 'Bryant', 'k@b.com', '3', false, true),
  new User(30, 'Steph', 'Curry', 's@c.com', '4', false, false),
];

@Injectable()
export class UserService {

  userSubject = new Subject();

  getUserSubject(){
    return this.userSubject;
  }

  getUserSubjectAsObservable():  Observable<any> {
    return this.userSubject.asObservable();
  }

  getUsers() { return USERS; }
  
  getUserById(id: number | string) {
    return USERS.find(function(user){
      return user.id === id;
    });
  }

  getUserByEmail(email: string) {
    return USERS.find(function(user){
      return user.email === email;
    });
  }

  getUserPromise(email: string){
    let userPromise = Promise.resolve(USERS);

    return userPromise
      .then(users => users.find(user => user.email === email));
  }

  updateUserByEmail(updateInfo) {
    var resultIndex = USERS.findIndex(function(user){
      if(user.email === updateInfo.email){
        return true;
      }
      return false;
    });

    console.log("Index: ", resultIndex);
    if(resultIndex > -1){
      USERS[resultIndex] = updateInfo;
    }

  }

  addUser(user: User) {
    USERS.push(user);
  }
}