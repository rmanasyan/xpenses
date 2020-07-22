import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../state/category.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesFormComponent implements OnInit, OnChanges {
  @Input() data: Category[];
  @Output() save = new EventEmitter<Category>();
  @Output() remove = new EventEmitter<Category>();
  @ViewChild('removeButton') removeButton: ElementRef;
  categoriesForm: FormGroup;
  private removeConfirmId: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges() {
    this.categoriesForm = this.fb.group({
      newCategory: this.fb.group({
        id: [null],
        icon: [null],
        name: [null, [Validators.required]]
      }),
      categories: this.fb.array(this.data.map(category => this.categoryFormGroup(category)))
    });
  }

  emitSave(category: AbstractControl) {
    this.save.emit(category.value as Category);
  }

  emitRemove(category: AbstractControl) {
    this.remove.emit(category.value as Category);
  }

  removeConfirm(id: string | null) {
    return this.removeConfirmId === id;
  }

  showRemoveConfirm(id: string | null) {
    this.removeConfirmId = id;

    if (id) {
      setTimeout(() => this.removeButton.nativeElement.focus(), 0);
    }
  }

  get categories() {
    return this.categoriesForm.get('categories') as FormArray;
  }

  get newCategory() {
    return this.categoriesForm.get('newCategory') as FormGroup;
  }

  private categoryFormGroup(category: Category) {
    return this.fb.group({
      id: [category.id],
      icon: [category.icon],
      name: [category.name, [Validators.required]]
    });
  }
}
