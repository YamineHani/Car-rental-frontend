import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { Observable } from "rxjs";
import { LoginRequest } from "../login/login-request.model";
import { environment } from "../../enviroment/enviroment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = environment.apiBaseUrl + "user";

    constructor(private http: HttpClient) { }

    public signup(userModel: UserModel): Observable<string> {
        return this.http.post(`${this.apiServerUrl}/signup`, userModel, {responseType: 'text'});
    }

    public login(loginRequest: LoginRequest): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/login`, loginRequest, {responseType: 'text'});
    }

    public setUser(user: UserModel) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    public getUser(): UserModel {
        let response: any = sessionStorage.getItem("user");
        if (!response) response = "";
        let user: UserModel = JSON.parse(response);
        if (typeof user === 'string') {
            user = JSON.parse(user);
        }
        return user;
    }
}