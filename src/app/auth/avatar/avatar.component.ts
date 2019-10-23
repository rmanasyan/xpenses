import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '../state/auth.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  email$: Observable<string> = this.authQuery.email$;
  photoURL$: Observable<string> = this.authQuery.photoURL$;

  constructor(private authQuery: AuthQuery) {}

  ngOnInit() {}
}
