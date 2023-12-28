import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CarService } from "../car/car.service";
import { Car } from "../car/car.model";
import { CarComponent } from "../car/car.component";
import { UserService } from "../main/user/user.service";
import { UserModel } from "../main/user/user.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzGridModule, CarComponent],
  providers: [CarService, UserService]
})
export class AdminComponent {

  carRows: Car[][] = [];
  user: UserModel;

  constructor(private carService: CarService, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
    this.carService.getCars().pipe().subscribe({
      next: (response: Car[]) => this.buildCarRows(response),
      error: (error) => console.log(error.error)
    });
  }

  private buildCarRows(response: Car[]) {
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
  }
}