import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  constructor() {
    const savedCart=sessionStorage.getItem('cart');
    if(savedCart){
      this.cart=JSON.parse(savedCart);
    }else{
      this.cart=[];
    }
   }

  private cart:any[]=[];

  public addItemCart(itemInfo: any) {
    // Check if the item already exists in the cart
    const existingItem = this.cart.find(item => item.itemCode === itemInfo.itemCode);

    if (existingItem) {
      // If it exists, update the quantity
      existingItem.itemQuantity += 1; // Increase by 1 or use itemInfo.itemQuantity if you want to add specific quantity
    } else {
      // Create a new cart item
      const newItem = {
        itemCode: itemInfo.itemCode,
        itemImage: itemInfo.itemImage,
        itemName: itemInfo.itemName,
        itemPrice: itemInfo.itemPrice,
        itemQuantity: 1 // You can use itemInfo.itemQuantity if it’s provided
      };

      // Push the new item to the cart
      this.cart.push(newItem);
    }

    // Log the current state of the cart
    console.log(this.cart);
    sessionStorage.setItem('cart',JSON.stringify(this.cart));
  }

  public removeItem(cartItem:any){
    const existingItem = this.cart.find(item=>item.itemCode===cartItem.itemCode);
    if(existingItem){
      if(existingItem.itemQuantity>0){
        existingItem.itemQuantity-=1;
        if(existingItem.itemQuantity===0){
          this.cart.filter(item=>item.itemCode!==cartItem.itemCode);
        }
      }
      
    }
    sessionStorage.setItem('cart',JSON.stringify(this.cart));
  }

  public getCartItems(){
    return this.cart;
  }

}
