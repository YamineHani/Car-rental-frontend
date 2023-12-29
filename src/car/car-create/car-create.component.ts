import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { NzFormControlComponent, NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
import { Car } from "../car.model";
import { CarService } from "../car.service";
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-carCreate',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
  standalone: true,
  imports: [CommonModule, NzFormControlComponent, NzFormModule,
    NzInputModule, NzFormModule, NzButtonModule, ReactiveFormsModule, NzSelectModule],
  providers: [CarService, NzModalService]
})
export class CarCreateComponent {

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

  constructor(private fb: NonNullableFormBuilder, private route: Router,
    private cdr: ChangeDetectorRef, private carService: CarService, private modal: NzModalService) {
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
      office: {officeId: Number(this.validateForm.value.officeId)}
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
      nzContent: 'Car Created Successfuly'
  });
  }

  ngOnInit(): void {

  }

  showDetails(): void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}