import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { withTransaction } from '@datorama/akita';
import firebase from 'firebase/app';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthQuery } from '../../auth/state/auth.query';
import { CategoriesStore } from './categories.store';
import { Category } from './category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private collection: AngularFirestoreCollection;

  constructor(private categoriesStore: CategoriesStore, private afs: AngularFirestore, private authQuery: AuthQuery) {}

  init() {
    this.syncCategories().subscribe();
  }

  syncCategories() {
    return this.authQuery.uid$.pipe(
      tap(() => this.categoriesStore.setLoading(true)),
      map((uid) => {
        this.collection = this.afs.collection(`users/${uid}/categories`, (ref) => ref.orderBy('name', 'asc'));

        return this.collection;
      }),
      switchMap((collection) => collection.stateChanges()),
      tap(() => this.categoriesStore.setLoading(false)),
      withTransaction((actions: DocumentChangeAction<Category>[]) => {
        if (!actions.length) {
          return;
        }

        for (const action of actions) {
          const id = action.payload.doc.id;
          const entity = action.payload.doc.data();

          switch (action.type) {
            case 'added':
              this.categoriesStore.upsert(id, { id, ...entity });
              break;
            case 'removed':
              this.categoriesStore.remove(id);
              break;
            case 'modified':
              this.categoriesStore.update(id, entity);
          }
        }
      }),
      catchError((error: firebase.FirebaseError) => {
        this.categoriesStore.setError(error);
        return EMPTY;
      })
    );
  }

  add(category: Partial<Category>) {
    return this.collection.add({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  update(id, category: Partial<Category>) {
    return this.collection.doc(id).update({
      ...category,
      updatedAt: new Date(),
    });
  }

  remove(id: string) {
    return this.collection.doc(id).delete();
  }
}
