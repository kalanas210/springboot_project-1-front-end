import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NavigationserviceService } from '../../navigationservice.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private user_service: UserService, private navigation_service: NavigationserviceService) { }

  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public city!: string;

  ngOnInit(): void {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('userId')!;
    this.newUser = this.user_service.userObject;
  }

  userId!: number;

  goToDashBoard() {
    this.router.navigate(['admin-dashboard/' + this.userId]);
  }

  public newUser: any = {
    userId: "",
    fullName: "",
    email: "",
    password: "",
    userType: "admin",
    phoneNumber: "",
    city: ""
  };

  async updateUser() {
    this.newUser.userId = this.userId;
    this.newUser.userType="admin";
    
    try {
      let response = await fetch("http://localhost:8080/users/api/v1/update", {
        method: "PUT",
        body: JSON.stringify(this.newUser),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let data = await response.json();
      if (response.ok) {
        alert("update");
        this.newUser = data;
      }
    } catch (error) {

    }
  }

  async deleteUser() {

    try {
      let response = await fetch(`http://localhost:8080/users/api/v1/delete/${this.userId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        this.navigation_service.avatarImg = false;
        this.navigation_service.reload = true;
        localStorage.removeItem('login');
        this.router.navigate(["/"]);
      }

    } catch (error) {
      console.log(error);
    }

  }



}
