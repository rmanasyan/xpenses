import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from '../state/auth.query';
import { AuthService } from '../state/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loading$: Observable<boolean> = this.authQuery.selectLoading();
  signedIn$: Observable<boolean> = this.authQuery.signedIn$;

  constructor(private authQuery: AuthQuery, private authService: AuthService, private router: Router) {}

  ngOnInit() {}

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
