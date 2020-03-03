import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from '../../auth/state/auth.query';
import { CategoriesService } from '../state/categories.service';
import { CategoriesQuery } from '../state/categories.query';
import { Category } from '../state/category.model';
import { fadeThroughAnimation } from '../../shared/animations/fade-through.animation';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [fadeThroughAnimation],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@fadeThroughAnimation]': '' }
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  loading$: Observable<boolean>;

  constructor(
    private categoriesQuery: CategoriesQuery,
    private categoriesService: CategoriesService,
    private authQuery: AuthQuery
  ) {}

  ngOnInit() {
    this.categories$ = this.categoriesQuery.selectAll();
    this.loading$ = this.categoriesQuery.selectLoading();
  }

  removeCategory(category: Category) {
    this.categoriesService.remove(category.id);
  }

  saveCategory(category: Category) {
    const { id, ...update } = { ...category };

    if (id) {
      this.categoriesService.update(id, update);
    } else {
      this.categoriesService.add(update);
    }
  }

  get backLink() {
    return this.authQuery.previousUrl;
  }
}
