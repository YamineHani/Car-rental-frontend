import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { CarComponent } from '../car/car.component';
import { CarDetailsComponent } from '../car/car-details/car-details.component';
import { AppRoutingModule } from './app.routes';
import { CarAddComponent } from '../car/car-add/car-add.component';
import { OfficeCreateComponent } from '../office/office-create/office-create.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [CommonModule, RouterOutlet, MainComponent, CarComponent, CarDetailsComponent,
  //   AppRoutingModule, CarAddComponent, OfficeCreateComponent],
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
