import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car.model';
import { environment } from '../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/all`);
  }

  public addCar(car: Car): Observable<Car[]>{
    return this.http.post<Car[]>(`${this.apiServerUrl}car/add`,car);
  }

  public updateCar(car: Car): Observable<Car[]>{
    return this.http.put<Car[]>(`${this.apiServerUrl}car/update`,car);
  }

  public deleteCar(carPlateId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}car/delete/${carPlateId}`);
  }

  public getMaxRate(): Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}car/find/maxRate`);
  }

  public getBrands(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiServerUrl}car/find/brands`);
  }

  public getTypes(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiServerUrl}car/find/types`);
  }

  public getColors(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiServerUrl}car/find/colors`);
  }

  public getCarsByBrand(brand: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/brand/${brand}`);
  }

  public getCarsByType(type: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/type/${type}`);
  }

  public getCarsByYear(year: number): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/year/${year}`);
  }

  public getCarsByStatus(status: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/status/${status}`);
  }

  public getCarsBellowRate(rate: number): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/rateBellow/${rate}`);
  }

  public getCarsByTransmission(transmission: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/transmission/${transmission}`);
  }

  public getCarsByFuel(fuel: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/fuel/${fuel}`);
  }

  public getCarsByBody(body: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/body/${body}`);
  }

  public getCarsByColor(color: string): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/color/${color}`);
  }

  public getCarsByCapacity(capacity: number): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/capacity/${capacity}`);
  }

  public getCarById(plateId: number): Observable<Car>{
    return this.http.get<Car>(`${this.apiServerUrl}car/find/plate/${plateId}`);
  }

  public getCarsByOffice(officeId: number): Observable<Car[]>{
    return this.http.get<Car[]>(`${this.apiServerUrl}car/find/office/${officeId}`);
  }
}
