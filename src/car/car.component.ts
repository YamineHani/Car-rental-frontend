import { Component, Input, OnInit } from "@angular/core";
import { CarService } from "./car.service";
import { Car } from "./car.model";
import { CommonModule } from "@angular/common";
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card'
import { NzAvatarComponent } from 'ng-zorro-antd/avatar'
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { Router } from "@angular/router";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
  standalone: true,
  imports: [CommonModule, NzCardComponent, NzAvatarComponent, NzCardMetaComponent,
    NzIconModule, NzDescriptionsModule],
  providers: [CarService]
})
export class CarComponent {
  
  @Input({ required: true }) car: Car;
  description: string = "";
  

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    this.description = this.car.rate + "$ per day";
  }

  showDetails(): void{
    this.router.navigateByUrl('/details', {state:{car: this.car}});
  }
}