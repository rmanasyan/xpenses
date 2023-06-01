import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { CategoriesQuery } from '../../../categories/state/categories.query';
import { Category } from '../../../categories/state/category.model';
import { Transaction } from '../../state/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent implements OnInit {
  @Input() data: Transaction;
  @Output() remove = new EventEmitter<string>();
  @Output() save = new EventEmitter<Partial<Transaction>>();
  @ViewChild('removeButton') removeButton: ElementRef;
  categories$: Observable<Category[]>;
  transactionForm: UntypedFormGroup;
  removeConfirm = false;
  openNumberInput = false;

  constructor(private fb: UntypedFormBuilder, private categoriesQuery: CategoriesQuery) {}

  ngOnInit() {
    this.categories$ = this.categoriesQuery.selectAll();
    this.buildForm();
    this.openNumberInput = !this.data;
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
      date: [firebase.firestore.Timestamp.fromDate(new Date())],
      details: [''],
      type: ['-'],
    });

    if (this.data) {
      this.transactionForm.patchValue(this.data, { emitEvent: false });
    }
  }
}
