import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
import { NavigationserviceService } from '../../navigationservice.service';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent implements AfterViewInit, OnInit {

  constructor(private router: Router, private navigation: NavigationserviceService, private user_service: UserService) { }

  @ViewChild("signInModal") signInElement!: ElementRef;
  private signInModal!: Modal;

  @ViewChild("forgotPassWordModal") forgotPasswordElement!: ElementRef;
  private forgotPasswordModal!: Modal;

  @ViewChild("signUpModal") signUpElement!: ElementRef;
  private signUpModal!: Modal;

  @ViewChild('deleteToast') deleteToast!: ElementRef;
  private deleteToastObject!: Toast;

  @ViewChild('resetPassword') resetPassword!: ElementRef;
  private resetPasswordModal!: Modal;

  @ViewChild("spinner") spinnerElement!: ElementRef;

  ngAfterViewInit(): void {
    this.signInModal = new Modal(this.signInElement.nativeElement);
    this.signUpModal = new Modal(this.signUpElement.nativeElement);
    this.deleteToastObject = new Toast(this.deleteToast.nativeElement);
    if (this.deleteToast && this.deleteToast.nativeElement) {
      this.deleteToastObject = new Toast(this.deleteToast.nativeElement);
    } else {
      console.error('deleteToast element is not available');
    }
    this.forgotPasswordModal = new Modal(this.forgotPasswordElement.nativeElement);
    this.resetPasswordModal = new Modal(this.resetPassword.nativeElement);
  }

  ngOnInit(): void {
    this.checkUserLogin();
  }

  loading: boolean = false;
  public showAvatar = false;
  showSignInButtons = true;

  public signUp: any = {
    userId: "",
    fullName: "",
    email: "",
    password: "",
    userType: "",
    adminId: "",
    phoneNumber: "",
    city: ""
  };

  public signIn = {
    email: "",
    password: ""
  };

  toastImgImg!:string;

  toastImg!: string;
  toastMsg!: string;

  checkUserLogin() {
    const savedLogin = localStorage.getItem('login');
    if (savedLogin) {
      this.signIn = JSON.parse(savedLogin);
      this.loginCheck();
    }
  }

  showSignIn() {
    this.signInModal.show();
  }

  showSignUp() {
    this.signUpModal.show();
  }

  forgotPassword() {
    console.log("forgot password");
    this.signInModal.hide();
    this.forgotPasswordModal.show();
  }

  firstLetter!: String;

  async btnSignUp() {
    console.log("signup");
    this.signUpModal.hide();
    this.loading = true;
    // this.spinnerElement.nativeElement.style.display = 'inline';
    try {

      let response = await fetch("http://localhost:8080/users/api/v1/save", {
        method: "Post",
        body: JSON.stringify(this.signUp),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          console.log(response);
          console.log(response.statusText);
          console.log(response.text);
          this.toastImg = "fas fa-exclamation-triangle";
          this.toastMsg = "Invalid Admin Id !";
          this.deleteToastObject.show();
          return;
        }

      }
      let data = await response.json();

      console.log(data);
      this.signUp = data;
      this.firstLetter = data.fullName.split("", 1);
      console.log(this.firstLetter);
      this.showSignInButtons = false;
      this.showAvatar = true;
      this.navigation.avatarImg = true;
      this.navigation.customerId = data.userId;
      this.signIn = data;
      console.log(this.signIn);
      localStorage.setItem('login', JSON.stringify(this.signIn));
      this.user_service.userObject = data;
      this.toastImgImg="img/success.png";
      this.toastImg = "fa-solid fa-circle-check";
      this.toastMsg = "Account created successfully !";
      this.deleteToastObject.show();
      return;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      // this.spinnerElement.nativeElement.style.display = 'none';
    }

  }


  async loginCheck() {
    console.log("signin");
    // this.signInModal.hide();
    this.loading = true;
    console.log(this.loading)
    // this.spinnerElement.nativeElement.style.display = 'flex';
    try {
      let response = await fetch("http://localhost:8080/users/api/v1/sign-in", {
        method: "Post",
        body: JSON.stringify(this.signIn),
        headers: {
          "Content-Type": "application/json"
        }
      });

      let data = await response.json();

      console.log(data);
      this.signUp = data;
      this.firstLetter = data.fullName.split("", 1);
      console.log(this.firstLetter)
      this.showSignInButtons = false;
      this.showAvatar = true;
      this.navigation.avatarImg = true;
      this.navigation.customerId = data.userId;
      this.signIn = data;
      console.log(this.signIn);
      localStorage.setItem('login', JSON.stringify(this.signIn));
      this.user_service.userObject = data;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      // this.spinnerElement.nativeElement.style.display = 'none';
    }
  }

  signOut() {
    localStorage.removeItem('login');
    this.showAvatar = false;
    this.showSignInButtons = true;
    this.avatar_pop_over = false;
  }

  async btnSignIn() {
    console.log("signin");
    this.signInModal.hide();
    this.loading = true;
    // this.spinnerElement.nativeElement.style.display = 'inline';
    try {

      let response = await fetch("http://localhost:8080/users/api/v1/sign-in", {
        method: "Post",
        body: JSON.stringify(this.signIn),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        this.toastImgImg="img/error.jpg";
        this.toastImg = "fas fa-exclamation-triangle";
        this.toastMsg = "Your email or password incorrect !";
        this.deleteToastObject.show();
        return;
      }

      let data = await response.json();

      console.log(data);
      this.signUp = data;
      this.firstLetter = data.fullName.split("", 1);
      console.log(this.firstLetter);
      this.showSignInButtons = false;
      this.showAvatar = true;
      this.navigation.avatarImg = true;
      this.navigation.customerId = data.userId;
      this.signIn = data;
      console.log(this.signIn);
      localStorage.setItem('login', JSON.stringify(this.signIn));
      this.user_service.userObject = data;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      // this.spinnerElement.nativeElement.style.display = 'none';
    }

  }

  avatar_pop_over: boolean = false;
  showAvatarPopOver() {
    console.log('clicked');
    this.avatar_pop_over = !this.avatar_pop_over;
    console.log('Popover visibility:', this.avatar_pop_over ? 'Shown' : 'Hidden');
  }

  goToDashboard() {
    console.log('dash')
    const userId = this.signUp.userId;
    if (this.signUp.userType === "admin") {
      this.router.navigate(['/admin-dashboard', userId]);
    } else if (this.signUp.userType === 'user') {
      this.router.navigate(['/user-dashboard', userId]);
    }
  }

  otp: boolean = false;

  forgotPasswordEmail!: string;

  otpNumber!: number;

  async otpBtn() {
    this.otp = true;
    try {
      let response = await fetch(`http://localhost:8080/users/api/v1/authenticate/${this.forgotPasswordEmail}`);
    } catch (error) {

    }
  }

  authObject: any = {
    email: '',
    otpNumber: ''
  }

  clickModel() {
    this.signInModal.hide();
    this.forgotPasswordModal.show();
  }

  async nextBtn() {
    this.authObject.email = this.forgotPasswordEmail;
    try {
      let response = await fetch("http://localhost:8080/users/api/v1/otp", {
        method: "POST",
        body: JSON.stringify(this.authObject),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(!response.ok){
        this.toastImgImg="img/error.jpg";
        this.toastImg = "fas fa-exclamation-triangle";
        this.toastMsg = "Error : "+response.statusText;
        this.deleteToastObject.show();
      }
      if (response.ok) {
        this.forgotPasswordModal.hide();
        this.resetPasswordModal.show();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public newPassword!: string;
  public confirmPassword!: string;

  resetObj: any = {
    email: "",
    password: ""
  }

  checkNewPassword() {
    if (this.newPassword.match(this.confirmPassword)) {
      // alert('ok');
      this.resetObj.email = this.forgotPasswordEmail;
      this.resetObj.password = this.newPassword;
    } else {
      return;
    }
  }

  async resetBtn() {
    this.checkNewPassword();
    // alert('working')
    try {
      let response = await fetch("http://localhost:8080/users/api/v1/reset-password", {
        method: "PUT",
        body: JSON.stringify(this.resetObj),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(!response.ok){
        return;
      }
      this.resetPasswordModal.hide();

    } catch (error) {

    }
  }

  navModel: boolean = false;

  btnNav() {
    this.navModel = !this.navModel;
  }


}
