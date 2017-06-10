import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  constructor(public _cookieService: CookieService){
    // _cookieService.removeAll();
  }

}
