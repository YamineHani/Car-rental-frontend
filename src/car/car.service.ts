import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car.model';
import { environment } from '../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiServerUrl = `${environment.apiBaseUrl}car`;

  constructor(private http: HttpClient) { }

  public getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}/all`);
  }

  public addCar(car: Car): Observable<Car[]>{
    return this.http.post<Car[]>(`${this.apiServerUrl}/add`,car);
  }

  public updateCar(car: Car): Observable<Car[]>{
    return this.http.put<Car[]>(`${this.apiServerUrl}/update`,car);
  }

  public deleteCar(carPlateId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${carPlateId}`);
  }
}
