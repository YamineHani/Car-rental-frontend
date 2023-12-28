import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CarService } from "../car/car.service";
import { Car } from "../car/car.model";
import { response } from "express";
import { error } from "console";
import { CarComponent } from "../car/car.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzGridModule, CarComponent],
  providers: [CarService]
})
export class AdminComponent {

  carRows: Car[][] = [];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getCars().pipe().subscribe({
      next: (response: Car[]) => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          const temp = [];
          const start = i;
          while (i < response.length && (i == start || i % 4 != 0)) {
            temp.push(response[i]);
            i++;
          }
          this.carRows.push(temp);
          if (temp.length == 4) i--;
        };
      },
      error: (error) => console.log(error.error)
    });
  }


}