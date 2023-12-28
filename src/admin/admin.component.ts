import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CarService } from "../car/car.service";
import { Car } from "../car/car.model";
import { response } from "express";
import { error } from "console";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzGridModule],
  providers: [CarService]
})
export class AdminComponent {

  cars: Car[];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getCars().pipe().subscribe({
      next: (response: Car[]) => {
        console.log(response);
      },
      error: (error) => console.log(error.error)
    });
  }


}