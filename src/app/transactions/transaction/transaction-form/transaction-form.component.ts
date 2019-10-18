import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID } from '@datorama/akita';
import { Transaction } from '../../state/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent implements OnInit {
  @Input() data: Transaction;
  @Output() discard = new EventEmitter();
  @Output() remove = new EventEmitter<ID>();
  @Output() save = new EventEmitter<Partial<Transaction>>();

  transactionForm: FormGroup = this.fb.group({
    id: [''],
    amount: ['', [Validators.required]],
    category: ['shopping'],
    date: ['2019-10-18'],
    details: [''],
    type: ['-']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.data) {
      this.transactionForm.patchValue(this.data);
    }
  }

  emitDiscard() {
    this.discard.emit();
  }

  emitRemove() {
    this.remove.emit(this.data.id);
  }

  emitSave() {
    this.save.emit(this.transactionForm.value);
  }
}
