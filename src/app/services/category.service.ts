import { Product } from './../models/product';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<{ name: string }[]> {
    return this.db.list<{ name: string }>('/categories', q => q.orderByChild('name')).valueChanges();
  }
}
