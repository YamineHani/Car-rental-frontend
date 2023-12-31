import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzDescriptionsItemComponent } from 'ng-zorro-antd/descriptions';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { CarService } from "../car/car.service";
import { Car } from "../car/car.model";
import { CarComponent } from "../car/car.component";
import { UserService } from "../main/user/user.service";
import { UserModel } from "../main/user/user.model";
//import { ReservationService } from "../reserve/reservation.service";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzInputModule } from "ng-zorro-antd/input";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-user',
  templateUrl: './user_in.component.html',
  styleUrl: './user_in.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzGridModule, CarComponent, NzPageHeaderModule, NzFormModule, NzButtonModule, ReactiveFormsModule,
    NzDescriptionsItemComponent, NzSpaceComponent, NzButtonComponent, NzSpaceItemDirective, NzDropDownModule, NzInputModule, NzIconModule, NzSliderModule],
  providers: [CarService, UserService]//, ReservationService]
})
export class UserInComponent {

  rateForm: FormGroup<{rate: FormControl<number>}>;
  brands: string[];
  types: string[];
  years: string[];
  statuses: string[] = ['ACTIVE', 'RENTED', 'OUTOFSERVICE'];
  transmissions: string[] = ['MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC'];
  fuels: string[] = ['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'CNG'];
  bodies: string[] = ['SEDAN', 'SUV', 'HATCHBACK', 'COUPE', 'CONVERTIBLE', 'WAGON', 'VAN', 'TRUCK'];
  colors: string[];
  tempCarRows: Car[][] = [];
  totalCarRows: Car[][] = [];
  user: UserModel;
  subtitle: string;
  selectedFind: string = 'find';
  cars: Car[] = [];
  maxRate: number;
  rate: number;

  constructor(private fb: NonNullableFormBuilder, private carService: CarService, private userService: UserService/*, private reservationService: ReservationService*/
    ,private router: Router) {
      this.rateForm = this.fb.group({rate: [1]});
      }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.subtitle = this.user.firstName + " " + this.user.lastName;
    this.carService.getCars().pipe().subscribe({
      next: (response: Car[]) => this.buildCarRows(response),
      error: (error) => console.log(error.error)
    });
    this.carService.getMaxRate().pipe().subscribe({
      next: (response: number) => this.maxRate = response,
      error: (error) => console.log(error.error)
    });
    this.carService.getBrands().pipe().subscribe({
      next: (response: string[] | null) => {
        if (response) {
          this.brands = response;
        } else {
          console.log("Cars response is null or undefined");
        }
      },
      error: (error) => console.log(error.error)
    });
    this.carService.getTypes().pipe().subscribe({
      next: (response: string[] | null) => {
        if (response) {
          this.types = response;
        } else {
          console.log("Cars response is null or undefined");
        }
      },
      error: (error) => console.log(error.error)
    });
    this.carService.getColors().pipe().subscribe({
      next: (response: string[] | null) => {
        if (response) {
          this.colors = response;
        } else {
          console.log("Cars response is null or undefined");
        }
      },
      error: (error) => console.log(error.error)
    });
    const currentYear = new Date().getFullYear();
        const startYear = 1990; // Adjust as needed
        this.years = Array.from({ length: currentYear - startYear + 1 },
            (_, index) => (startYear + index).toString()).reverse();
    this.maxRate = Number(this.carService.getMaxRate());
  }

  private buildCarRows(response: Car[]) {
    for (let i = 0; i < response.length; i++) {
      const temp = [];
      const start = i;
      while (i < response.length && (i == start || i % 4 != 0)) {
        temp.push(response[i]);
        i++;
      }
      this.totalCarRows.push(temp);
      this.tempCarRows.push(temp);
      if (temp.length == 4) i--;
    };
  }

  reserveCar(): void{
    this.router.navigateByUrl('/reserveCar');
  }

  findReservations(): void{
    //this.reservationService.getReservationsByUser(this.user.id);
  }

  filterRates(): void{
    this.rate = Number(this.rateForm.value.rate);
    this.findCarsBy(this.rate);
  }

  findCarsBy(value: string | number): void{
    switch(this.selectedFind) {
      case 'find':
        this.carService.getCars().pipe().subscribe({
          next: (response: Car[] | null) => {
            if (response) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            } else {
              alert("No cars found in system");
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      // case 'id':
      //   const id: number = Number(this.idForm.value.plateId);
      //   this.carService.getCarById(id).pipe().subscribe({
      //     next: (response: Car | null) => {
      //       if (response) {
      //         for (let j = 0; j < this.tempCarRows.length; j++)
      //         {
      //           this.tempCarRows.pop();
      //         }
      //         alert(response.plateId)
      //         const temp = [];
      //         temp.push(response);
      //         this.tempCarRows.push(temp);
      //       } else {
      //         for (let j = 0; j < this.tempCarRows.length; j++)
      //         {
      //           this.tempCarRows.pop();
      //         }
      //         alert("No car with id " + value + " found");
      //       }
      //     },
      //       error: (error) => console.log(error.error)
      //   });
      //   break;
      case 'brand':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByBrand(String(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      case 'type':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByType(String(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      case 'year':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByYear(Number(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            } else {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              alert("No cars of " + value + " year found");
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
        case 'status':
          this.selectedFind = this.selectedFind + ": " + value;
          this.carService.getCarsByStatus(String(value)).pipe().subscribe({
            next: (response: Car[]) => {
              if (response.length > 0) {
                for (let j = 0; j < this.tempCarRows.length; j++)
                {
                  this.tempCarRows.pop();
                }
                for (let i = 0; i < response.length; i++) {
                  const temp = [];
                  const start = i;
                while (i < response.length && (i == start || i % 4 != 0)) {
                  temp.push(response[i]);
                  i++;
                }
                this.tempCarRows.push(temp);
                if (temp.length == 4) i--;
              }
              } else {
                for (let j = 0; j < this.tempCarRows.length; j++)
                {
                  this.tempCarRows.pop();
                }
                alert("No " + value + " cars found");
              }
            },
              error: (error) => console.log(error.error)
          });
          break;
          case 'rate':
            this.selectedFind = this.selectedFind + ": " + this.rate;
            this.carService.getCarsBellowRate(Number(value)).pipe().subscribe({
              next: (response: Car[]) => {
                if (response.length > 0) {
                  for (let j = 0; j < this.tempCarRows.length; j++)
                  {
                    this.tempCarRows.pop();
                  }
                  for (let i = 0; i < response.length; i++) {
                    const temp = [];
                    const start = i;
                  while (i < response.length && (i == start || i % 4 != 0)) {
                    temp.push(response[i]);
                    i++;
                  }
                  this.tempCarRows.push(temp);
                  if (temp.length == 4) i--;
                }
                } else {
                  for (let j = 0; j < this.tempCarRows.length; j++)
                  {
                    this.tempCarRows.pop();
                  }
                  alert("No cars with rate less than " + value + " $ found");
                }
              },
                error: (error) => console.log(error.error)
            });
            break;
      case 'transmission':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByTransmission(String(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            } else {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              alert("No cars of " + value + " transmission type found");
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      case 'fuel':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByFuel(String(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            } else {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              alert("No cars of " + value + " fuel type found");
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      case 'body':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByBody(String(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            } else {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              alert("No cars of " + value + " body style found");
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      case 'color':
        this.selectedFind = this.selectedFind + ": " + value;
        this.carService.getCarsByColor(String(value)).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            }
          },
            error: (error) => console.log(error.error)
        });
        break;
      case 'capacity':
        /*const cap: number = Number(this.capForm.value.capacity);
        this.carService.getCarsByCapacity(cap).pipe().subscribe({
          next: (response: Car[]) => {
            if (response.length > 0) {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              for (let i = 0; i < response.length; i++) {
                const temp = [];
                const start = i;
              while (i < response.length && (i == start || i % 4 != 0)) {
                temp.push(response[i]);
                i++;
              }
              this.tempCarRows.push(temp);
              if (temp.length == 4) i--;
            }
            } else {
              for (let j = 0; j < this.tempCarRows.length; j++)
              {
                this.tempCarRows.pop();
              }
              alert("No cars with capacity " + value + " seats found");
            }
          },
            error: (error) => console.log(error.error)
        });*/
        break;
    }
  }

  editUser(): void{

  }
}