import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { routes } from './app.router';

import { EventListService } from './event-list.service';
import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegistrationComponent } from './registration/registration.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterOutletStubComponent, RouterLinkStubDirective } from '../testing/router-stubs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RegistrationComponent,
    EventsComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    RouterOutletStubComponent,
    RouterLinkStubDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    routes
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [EventListService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
