import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from '../state/auth.query';
import { AuthService } from '../state/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  email$: Observable<string> = this.authQuery.email$;
  loading$: Observable<boolean> = this.authQuery.selectLoading();
  signedIn$: Observable<boolean> = this.authQuery.signedIn$;

  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  ngOnInit() {}

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }
}
