import { Component, OnInit } from '@angular/core';
import { AuthService } from '../state/auth.service';
import { AuthQuery } from '../state/auth.query';
import { Auth } from '../state/auth.model';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  auth$: Observable<Auth[]>;
  isLoading$: Observable<boolean>;

  constructor(private authQuery: AuthQuery,
              private authService: AuthService
  ) { }

  ngOnInit() {
      this.auth$ = this.authQuery.selectAll();
      this.isLoading$ = this.authQuery.selectLoading();

      // this.authService.get().subscribe({
     //   error(err) {
     //     this.error = err;
     //   }
    //  });
    }

    add(auth: Auth) {
      this.authService.add(auth);
    }

    update(id: ID, auth: Partial<Auth>) {
      this.authService.update(id, auth);
    }

    remove(id: ID) {
      this.authService.remove(id);
    }
}
