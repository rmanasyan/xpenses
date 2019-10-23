import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/state/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  constructor(private authService: AuthService) {
    // TODO: authService required to init .get() subscription
  }

  ngOnInit() {}
}
