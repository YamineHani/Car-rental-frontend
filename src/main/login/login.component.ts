import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [CommonModule, NzFormModule, NzButtonModule, ReactiveFormsModule],
    providers: []
})
export class LoginComponent {
    validateForm: FormGroup<{
        userName: FormControl<string>;
        password: FormControl<string>;
    }> = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor(private fb: NonNullableFormBuilder) { }

    ngOnInit(): void { }

    submitForm() { }
}