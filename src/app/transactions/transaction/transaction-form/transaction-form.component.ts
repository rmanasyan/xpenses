import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID } from '@datorama/akita';
import { XDatePipe } from '../../../shared/pipes/x-date.pipe';
import { Transaction } from '../../state/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent implements OnInit {
  @Input() data: Transaction;
  @Output() remove = new EventEmitter<ID>();
  @Output() save = new EventEmitter<Partial<Transaction>>();

  transactionForm: FormGroup = this.fb.group({
    id: [''],
    amount: ['', [Validators.required]],
    category: ['shopping'],
    date: [this.today],
    details: [''],
    type: ['-']
  });

  constructor(private fb: FormBuilder, private xDatePipe: XDatePipe) {}

  ngOnInit() {
    if (this.data) {
      // TODO: use ControlValueAccessor or something?
      const date = this.xDatePipe.transform(this.data.date, 'yyyy-MM-ddTHH:mm:ss');
      const formValue = {...this.data, date};

      this.transactionForm.patchValue(formValue, { emitEvent: false });
    }
  }

  emitRemove() {
    this.remove.emit(this.data.id);
  }

  emitSave() {
    // TODO: use ControlValueAccessor or something?
    const dateVal = this.transactionForm.get('date');
    dateVal.setValue(new Date(dateVal.value));

    this.save.emit(this.transactionForm.value);
  }

  get today() {
    return this.xDatePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');
  }
}
