import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from '../state/auth.query';
import { AuthService } from '../state/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loading$: Observable<boolean>;
  signedIn$: Observable<boolean>;

  constructor(private authQuery: AuthQuery, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loading$ = this.authQuery.selectLoading();
    this.signedIn$ = this.authQuery.signedIn$;
  }

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

  start() {
    this.router.navigate(['/']);
  }
}
