import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router } from '@angular/router';
import { NavigationserviceService } from '../../navigationservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,private navigation_service:NavigationserviceService) {}

  ngOnInit(): void {
    if(this.navigation_service.reload){
      window.location.reload();
    }
  }

}
