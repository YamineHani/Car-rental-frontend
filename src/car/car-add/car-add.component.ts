import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzModalService } from 'ng-zorro-antd/modal';
import { CarService } from "../car.service";
import { Car } from "../car.model";



@Component({
    selector: 'app-carAdd',
    templateUrl: './car-add.component.html',
    styleUrls: ['./car-add.component.css'],
    standalone: true,
    imports: [CommonModule, NzFormModule, NzButtonModule,
        ReactiveFormsModule, NzInputModule],
    providers: [NzModalService, CarService]
})
export class CarAddComponent {
    validateForm: FormGroup<{
        plateId: FormControl<string>;
        brand: FormControl<string>;
        type: FormControl<string>;
        year: FormControl<string>;
        status: FormControl<string>;
        rate: FormControl<string>;
        transmissionType: FormControl<string>;
        fuelType: FormControl<string>;
        bodyStyle: FormControl<string>;
        color: FormControl<string>;
        capacity: FormControl<string>;
        imageUrl: FormControl<string>;
        officeId: FormControl<string>;
    }>;

    constructor(private fb: NonNullableFormBuilder, private modal: NzModalService,
        private carService: CarService) {
        this.validateForm = this.fb.group({
            plateId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            brand: ['', [Validators.required]],
            type: ['', [Validators.required]],
            year: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            status: ['', [Validators.required]],
            rate: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            transmissionType: ['', [Validators.required]],
            fuelType: ['', [Validators.required]],
            bodyStyle: ['', [Validators.required]],
            color: ['', [Validators.required]],
            capacity: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            imageUrl: ['', [Validators.required]],
            officeId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
        });
    }

    ngOnInit(): void { }

    submitForm(): void {
        const car: Car = {
            plateId: Number(this.validateForm.value.plateId),
            brand: this.validateForm.value.brand!,
            type: this.validateForm.value.type!,
            year: Number(this.validateForm.value.year),
            status: this.validateForm.value.status!,
            rate: Number(this.validateForm.value.rate),
            transmissionType: this.validateForm.value.transmissionType!,
            fuelType: this.validateForm.value.fuelType!,
            bodyStyle: this.validateForm.value.bodyStyle!,
            color: this.validateForm.value.color!,
            capacity: Number(this.validateForm.value.capacity),
            imageUrl: this.validateForm.value.imageUrl!,
            office: { officeId: Number(this.validateForm.value.officeId) }
        };
        this.carService.addCar(car).pipe().subscribe({
            next: (response) => this.success(),
            error: (error) => this.error(error.error)
        });
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
    }


    private error(msg: string): void {
        this.modal.error({
            nzTitle: 'Error',
            nzContent: msg
        });
    }

    private success(): void {
        this.modal.success({
            nzTitle: 'Success',
            nzContent: 'Car added Successfuly',
            nzOnOk: () => window.location.reload()
        });
    }
}