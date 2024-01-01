import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/enviroment";
import { Reservation } from "./car-reserve.model";


@Injectable({
  providedIn: 'root'
})
export class CarReservationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public reserveCar(reservation: Reservation): Observable<string>{ 
    return this.http.post(`${this.apiServerUrl}reservations/add`,reservation, {responseType: 'text'});
  }
  
}