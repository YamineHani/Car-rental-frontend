import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Car } from '../../car/car.model';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzBadgeModule } from 'ng-zorro-antd/badge'

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.css',
    standalone: true,
    imports: [CommonModule, NzDescriptionsModule, NzBadgeModule],
    providers: []
})
export class CarDetailsComponent {
    car: Car = {
        brand: "Mercedes Benz",
        bodyStyle: "sport",
        capacity: 4,
        color: "blue",
        fuelType: "95",
        imageUrl: "https://www.hdwallpapers.in/download/mercedes_benz_sls_amg_hd-wide.jpg",
        plateId: 2222,
        rate: 70,
        status: "available",
        transmissionType: "type",
        type: "free",
        year: 2022
    };

    constructor() {
    }

    ngOnInit(): void {
    }
}