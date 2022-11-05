import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authservice.getIsAuth();
    this.authListenerSubs = this.authservice
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authservice.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
