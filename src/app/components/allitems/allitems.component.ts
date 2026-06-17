import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemsComponent } from '../product-items/product-items.component';

@Component({
  selector: 'app-allitems',
  standalone: true,
  imports: [NgFor,NgIf,ProductItemsComponent],
  templateUrl: './allitems.component.html',
  styleUrl: './allitems.component.css'
})
export class AllitemsComponent implements OnInit{

  ngOnInit(): void {
    this.loadItems();
  }

  public itemsList:any = [];

  loading:boolean=false;

  async loadItems(){
    this.loading=true;
    try {

      let response = await fetch("http://localhost:8080/item/api/v1/all");
      let data = await response.json();
      this.itemsList=data;
      console.log(this.itemsList);
      
    } catch (error) {
      
    }finally{
      this.loading=false;
    }
  }

  async search(category:any){
    this.loading=true;
    try {
      let response=await fetch(`http://localhost:8080/item/api/v1/category/${category}`);
      let data=await response.json();
      this.itemsList=data;
      console.log(this.itemsList);
    } catch (error) {
      
    }finally{
      this.loading=false;
    }
  }

 

}
