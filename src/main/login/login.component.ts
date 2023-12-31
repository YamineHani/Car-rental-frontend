import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { LoginRequest } from "./login-request.model";
import { UserService } from "../user/user.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { UserModel } from "../user/user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [CommonModule, NzFormModule, NzButtonModule, ReactiveFormsModule],
    providers: [UserService, NzModalService]
})
export class LoginComponent {
    validateForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
    }> = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor(private fb: NonNullableFormBuilder, private userService: UserService,
        private modal: NzModalService, private router: Router) { }

    ngOnInit(): void { }

    submitForm() { 
        const loginRequest: LoginRequest = {
            email: this.validateForm.value.email,
            password: this.validateForm.value.password
        }
        this.userService.login(loginRequest).pipe().subscribe({
            next: (response: UserModel) => {
                this.userService.setUser(response);
                response = this.userService.getUser();
                alert(response.userRole === 'USER');
                if(response.userRole == 'USER')
                {
                    this.router.navigateByUrl('/user');
                }
                else
                {
                    this.router.navigateByUrl('/admin');
                }
            },
            error: (error) => this.error(error.error)
        });
    }

    private error(msg: string): void {
        this.modal.error({
            nzTitle: 'Error',
            nzContent: msg
        });
    }

}