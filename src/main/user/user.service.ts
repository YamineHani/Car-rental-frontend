import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = "http://localhost:8080/api/v1/registration";

    constructor(private http: HttpClient) { }

    public signup(userModel: UserModel): Observable<string> {
        return this.http.post(`${this.apiServerUrl}`, userModel, {responseType: 'text'});
    }
}