import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent implements OnInit {
  transactionForm = this.fb.group({
    type: ['-'],
    amount: ['', [Validators.required]],
    category: ['shopping'],
    date: [],
    details: ['']
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  save() {
    console.log(this.transactionForm.value);
  }

}
