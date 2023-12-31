import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../enviroment/enviroment";
import { Observable } from "rxjs";
import { Car } from "./car.model";


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/all`);
  }

  public addCar(car: Car): Observable<string>{ //I changed observable
    return this.http.post(`${this.apiServerUrl}car/add`,car, {responseType: 'text'});
  }

  public updateCar(car: Car): Observable<String>{
    return this.http.put(`${this.apiServerUrl}car/update`,car, {responseType: 'text'});
  }

  public deleteCar(carPlateId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}car/delete/${carPlateId}`);
  }
}
