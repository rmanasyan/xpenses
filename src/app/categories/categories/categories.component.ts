import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../state/categories.service';
import { CategoriesQuery } from '../state/categories.query';
import { Category } from '../state/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  isLoading$: Observable<boolean>;

  constructor(private categoriesQuery: CategoriesQuery, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesQuery.selectAll();
    this.isLoading$ = this.categoriesQuery.selectLoading();
  }

  add(name: string) {
    this.categoriesService.add({ name });
  }
}
