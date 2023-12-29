import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzDescriptionsItemComponent } from 'ng-zorro-antd/descriptions';
import { NzButtonComponent } from 'ng-zorro-antd/button';
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
  imports: [CommonModule, RouterOutlet, NzGridModule, CarComponent, NzPageHeaderModule, 
    NzDescriptionsItemComponent, NzSpaceComponent, NzButtonComponent, NzSpaceItemDirective],
  providers: [CarService, UserService]
})
export class AdminComponent {

  carRows: Car[][] = [];
  user: UserModel;
  subtitle: string;

  constructor(private carService: CarService, private userService: UserService
    ,private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.subtitle = this.user.firstName + " " + this.user.lastName;
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

  addCar(): void{
    this.router.navigateByUrl('/addCar');
  }

  addOffice(): void{ 
    // TODO ADD OFFICE 
  }

}