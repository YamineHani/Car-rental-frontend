import { Component } from "@angular/core";
import { CarService } from "./car.service";
import { Car } from "./car.model";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import {NzTableModule} from 'ng-zorro-antd/table'

@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrl: './car.component.css',
    standalone: true,
    imports: [CommonModule, NzTableModule],
    providers: [CarService]
})
export class CarComponent {
    public cars: Car[] = []; //idk

  constructor(private carService: CarService){}

  ngOnInit(): void {
      this.getCars();
  }

  public getCars():void{
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}