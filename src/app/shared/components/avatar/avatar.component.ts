import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from '../../../auth/state/auth.query';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  email$: Observable<string>;
  photoURL$: Observable<string>;

  constructor(private authQuery: AuthQuery) {}

  ngOnInit() {
    this.email$ = this.authQuery.email$;
    this.photoURL$ = this.authQuery.photoURL$;
  }
}
