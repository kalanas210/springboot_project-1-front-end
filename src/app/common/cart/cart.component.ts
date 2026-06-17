import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../cart.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Toast } from 'bootstrap';
import { NavigationserviceService } from '../../navigationservice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, AfterViewInit {

  constructor(private cartsService: CartService, private navigationService: NavigationserviceService) {}

  ngAfterViewInit(): void {
    this.toast=new Toast(this.toastDiv.nativeElement);
  }

  toastMsg!:string;
  toastImg!:string;
  toastStyle={
    color: '#00ff1e',
  };

  cart: any[] = [];
  orderDetailArray: any[] = []

  emptyCartImg: boolean = true;

  totalValue: number = 0.00;

  @ViewChild('liveToast') toastDiv!:ElementRef;
  private toast!:Toast;

  ngOnInit(): void {
    this.cart = this.cartsService.getCartItems();
    console.log(this.cart);
    this.loadCartItems();
    this.setTotalValue();
  }

  loadCartItems() {
    if (this.cart.length !== 0) {
      this.emptyCartImg = false;
    }
  }

  setTotalValue() {
    this.totalValue=0.00;
    if (this.cart.length !== 0) {
      this.cart.forEach(cartItem => {
        this.totalValue += cartItem.itemQuantity * cartItem.itemPrice;
      });
    }
  }

  orderDetails: any = {
    itemCode: '',
    itemQty: ''
  }

  order: any = {
    customerId: '',
    orderDetailsList: this.orderDetailArray
  }

  addOrderDteais() {
    this.cart.forEach(cartItem => {
      const newOrder = {
        itemCode: cartItem.itemCode,
        itemQty: cartItem.itemQuantity
      }
      this.orderDetailArray.push(newOrder);
    });
    this.order.customerId=this.navigationService.customerId;
  }

  async saveOrder(){
    try {
      let response=await fetch("http://localhost:8080/order/api/v1/save",{
        method: "Post",
        body: JSON.stringify(this.order),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data=await response.json();
    } catch (error) {
      console.log(error);
    }finally{

    }
  }

  btnAddItem(cartItem:any){
    this.cartsService.addItemCart(cartItem);
    this.cart = this.cartsService.getCartItems();
    console.log(this.cart);
    this.loadCartItems();
    this.setTotalValue();
  }

  btnRemoveItem(cartItem:any){
    this.cartsService.removeItem(cartItem);
    this.cart = this.cartsService.getCartItems();
    console.log(this.cart);
    this.loadCartItems();
    this.setTotalValue();
  }

  btnCheckOut() {
    if (this.navigationService.avatarImg) {
      this.toastImg="fa-solid fa-circle-check";
      this.toastMsg="Order Placed Successfully !";
      this.toast.show();
      this.addOrderDteais();
      console.log(this.order);
      this.saveOrder();
    } else {
      this.toastImg="fas fa-exclamation-triangle";
      this.toastStyle={
        color: '#ff0000',
      }
      // this.toastStyle="color: #ff0000;"
      this.toastMsg="You Are Not Registered Customer !";
      this.toast.show();
    }
  }


}
