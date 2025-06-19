import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public userObject: any = {
    userId:"",
    fullName: "",
    email: "",
    password: "",
    userType: "",
    phoneNumber: "",
    city: ""
  };


}
