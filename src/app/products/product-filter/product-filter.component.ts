import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.sass']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<{ name: string }[]>;
  @Input('category') category: string;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
   }

  ngOnInit(): void {
  }

}
