import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { CategoriesQuery } from '../../../categories/state/categories.query';
import { Category } from '../../../categories/state/category.model';
import { Transaction } from '../../state/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent implements OnInit {
  @Input() data: Transaction;
  @Output() remove = new EventEmitter<string>();
  @Output() save = new EventEmitter<Partial<Transaction>>();
  @ViewChild('removeButton') removeButton: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  categories$: Observable<Category[]>;
  transactionForm: FormGroup;
  removeConfirm = false;

  constructor(private fb: FormBuilder, private categoriesQuery: CategoriesQuery) {}

  ngOnInit() {
    this.categories$ = this.categoriesQuery.selectAll();
    this.buildForm();
    this.focusInput();
  }

  emitRemove() {
    this.remove.emit(this.data.id);
  }

  emitSave() {
    this.save.emit(this.transactionForm.value);
  }

  toggleConfirm() {
    this.removeConfirm = !this.removeConfirm;

    if (this.removeConfirm) {
      setTimeout(() => this.removeButton.nativeElement.focus(), 0);
    }
  }

  private buildForm() {
    this.transactionForm = this.fb.group({
      id: [''],
      amount: ['', [Validators.required, Validators.min(0)]],
      categoryId: [''],
      date: [firestore.Timestamp.fromDate(new Date())],
      details: [''],
      type: ['-']
    });

    if (this.data) {
      this.transactionForm.patchValue(this.data, { emitEvent: false });
    }
  }

  private focusInput() {
    if (!this.data) {
      setTimeout(() => this.amountInput.nativeElement.focus(), 0);
    }
  }
}
