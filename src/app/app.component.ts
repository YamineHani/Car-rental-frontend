import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { CarComponent } from '../car/car.component';
import { Car } from '../car/car.model';
import { CarDetailsComponent } from '../car/car-details/car-details.component';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent, CarComponent, CarDetailsComponent,
    AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // cars: Car[] = [{
  //   brand: "Mercedes Benz",
  //   bodyStyle: "sport",
  //   capacity: 4,
  //   color: "blue",
  //   fuelType: "95",
  //   imageUrl: "https://www.hdwallpapers.in/download/mercedes_benz_sls_amg_hd-wide.jpg",
  //   plateId: 2222,
  //   rate: 70,
  //   status: "available",
  //   transmissionType: "type",
  //   type: "free",
  //   year: 2022
  // }];
}
