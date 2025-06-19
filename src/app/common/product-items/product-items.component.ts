import { Component, Input } from '@angular/core';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-items',
  standalone: true,
  imports: [],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css'
})
export class ProductItemsComponent {
  @Input()
  public itemInfo:any;

  constructor(private cartService:CartService){}

  btnAddToCart(itemInfo:any){
    
    this.cartService.addItemCart(itemInfo);
  }
}
