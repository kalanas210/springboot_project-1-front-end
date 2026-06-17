import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import {Toast} from 'bootstrap'

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent implements OnInit, AfterViewInit  {

  userId!: number;

  @ViewChild('addSuppliers') addSuppliersElement!: ElementRef;
  private addSuppliers!: Modal;

  @ViewChild('addItems') addItemsElement!: ElementRef;
  private addItemsModal!: Modal;

  @ViewChild('updateItem') updateItemElement!:ElementRef;
  private updateItemModal!:Modal;

  @ViewChild('confirmDelete') confirmDelete!:ElementRef;
  private confirmDeleteModal!:Modal;

  @ViewChild('deleteToast') deleteToast!:ElementRef;
  private deleteToastObject!:Toast;

  toastMsg!:string;
  toastImg!:string;
  searchBox:boolean=false;

  supplier = {
    supplierName: '',
    supplierEmail: '',
    supplierPhone: '',
    supplierCompany: ''
  };

  item={
    itemName:"",
    itemImage:"",
    itemDescription:"",
    itemPrice:0,
    itemQuantity:0,
    itemCategory:"",
    itemCode:"",
    supplierId:""
  };

  constructor(private route: ActivatedRoute, private navigateRoute:Router) {}

  ngAfterViewInit(): void {
    this.addSuppliers = new Modal(this.addSuppliersElement.nativeElement);
    this.addItemsModal = new Modal(this.addItemsElement.nativeElement);
    this.updateItemModal = new Modal(this.updateItemElement.nativeElement);
    this.confirmDeleteModal = new Modal(this.confirmDelete.nativeElement);
    this.deleteToastObject = new Toast(this.deleteToast.nativeElement);
  }

  public itemsList:any = [];

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    this.getItemDetails();
  }

  loading:boolean=false;
  async getItemDetails(){
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

  addSuppliersFunction() {
    this.addSuppliers.show();
  }

  btnAddItems() {
    this.addItemsModal.show();
  }

  async submitSupplierForm() {
    try {
      console.log(this.supplier);
      let response = await fetch('http://localhost:8080/supplier/api/v1/save', {
        method: 'POST',
        body: JSON.stringify(this.supplier),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  async submitItemForm(){
    try {
      console.log(this.item);
      let response = await fetch('http://localhost:8080/item/api/v1/save', {
        method: 'POST',
        body: JSON.stringify(this.item),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally{
      this.addItemsModal.hide();
    }
  }

  public newItem:any={
    itemName:"",
    itemImage:"",
    itemDescription:"",
    itemPrice:0,
    itemQuantity:0,
    itemCategory:"",
    itemCode:"",
    supplierId:""
  };

  btnUpdate(item:any){
    this.newItem=item;
    this.updateItemModal.show();
  }

  deleteId!:string;
  btnDelete(item:any){
    this.deleteId=item.itemCode;
    this.confirmDeleteModal.show();
  }

  async btnUpdateItem(){
    try {
      console.log(this.item);
      let response = await fetch('http://localhost:8080/item/api/v1/update', {
        method: 'PUT',
        body: JSON.stringify(this.newItem),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      console.log(data);
      this.itemsList=data;
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally{
      this.updateItemModal.hide();
    }
  }

  async btnDeleteItem(){
    try{
      let response=await fetch(`http://localhost:8080/item/api/v1/delete/${this.deleteId}`,{
        method:"DELETE",
      });
      if(response.ok){
        this.toastImg="fa-solid fa-circle-check";
        this.toastMsg='Item Deleted Successfully !';
        this.getItemDetails();
        this.detailsDiv=false;
        this.deleteToastObject.show();
      }else{
        this.toastMsg=`Failed to delete item:${response.status} `;
        this.deleteToastObject.show();
      }
    }catch{

    }finally{
      this.confirmDeleteModal.hide();
    }
  }

  clickOnMainContent(){
    this.searchBox=false;
  }

  clickOnSearchBox(){
    this.searchBox=true;
  }

  searchText:string="";

  clickOnSearchBtn(){
    alert(this.searchText);
    this.searchItemByItemCode();
  }
  detailsDiv:boolean=false;
  async searchItemByItemCode(){
    try {
      let response=await fetch(`http://localhost:8080/item/api/v1/item_code/${this.searchText}`);
      let data=await response.json();
      console.log(data);
      this.item=data;
      this.detailsDiv=true;
    } catch (error) {
      
    }finally{
      this.searchBox=false;
    }
  }
  
  clickOnSearchResult(searchresult:string){
    
  }

  goToProfile(){
    this.navigateRoute.navigate(['user-profile/'+this.userId]);
  }
}
