import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { setLoading, withTransaction } from '@datorama/akita';
import { FirebaseError, firestore } from 'firebase/app';
import { throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
    return this.authQuery.select('uid').pipe(
      setLoading(this.categoriesStore),
      map(uid => {
        this.collection = this.afs.collection(`users/${uid}/categories`, ref => ref.orderBy('name', 'asc'));

        return this.collection;
      }),
      switchMap(collection => collection.stateChanges()),
      withTransaction((actions: DocumentChangeAction<Category>[]) => {
        this.categoriesStore.setLoading(false);

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
      catchError((error: FirebaseError) => {
        this.categoriesStore.setError(error);
        return throwError(error);
      })
    );
  }

  add(category: Partial<Category>) {
    return this.collection.add({
      ...category,
      createdAt: CategoriesService.timestamp,
      updatedAt: CategoriesService.timestamp
    });
  }

  update(id, category: Partial<Category>) {
    return this.collection.doc(id).update({
      ...category,
      updatedAt: CategoriesService.timestamp
    });
  }

  remove(id: string) {
    return this.collection.doc(id).delete();
  }

  private static get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
