import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

@NgModule({
  declarations: [CategoriesComponent, CategoriesFormComponent],
  imports: [CommonModule, CategoriesRoutingModule, ReactiveFormsModule, SharedModule]
})
export class CategoriesModule {}
