import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent implements OnInit {
  order$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.order$ = this.authService.user$.pipe(switchMap(user =>
      this.orderService.getOrdersByUserId(user.uid)
    ));
  }
}
