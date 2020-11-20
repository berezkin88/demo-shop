import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.sass']
})
export class AdminOrdersComponent implements OnInit {
  order$: Observable<Order[]>;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order$ = this.orderService.getOrders();
  }

}
