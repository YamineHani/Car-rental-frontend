import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { Observable, Observer } from "rxjs";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true,
    imports: [CommonModule, NzFormModule, NzButtonModule,
        ReactiveFormsModule, NzInputModule],
    providers: []
})
export class RegisterComponent {

    validateForm: FormGroup<{
        userName: FormControl<string>;
        email: FormControl<string>;
        password: FormControl<string>;
        confirm: FormControl<string>;
    }>;

    submitForm(): void {
        console.log('submit', this.validateForm.value);
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
    }

    validateConfirmPassword(): void {
        setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
    }

    confirmValidator: ValidatorFn = (control: AbstractControl) => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    constructor(private fb: NonNullableFormBuilder) {
        this.validateForm = this.fb.group({
            userName: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]]
        });
    }

    ngOnInit(): void { }
}