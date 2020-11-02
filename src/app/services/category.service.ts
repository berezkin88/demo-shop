import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): any {
    return this.db.list('/categories', q => q.orderByChild('name')).valueChanges();
  }
}
