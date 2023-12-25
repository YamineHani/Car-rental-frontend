import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { Observable } from "rxjs";
import { LoginRequest } from "../login/login-request.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = "http://localhost:8080/api/v1/user";

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
        let user: any = sessionStorage.getItem("user");
        if (!user) user = "";
        return JSON.parse(user) as UserModel;
    }
}