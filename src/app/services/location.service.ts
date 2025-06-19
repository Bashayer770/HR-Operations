import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API } from '.';
import { Department } from '../models/Department';
import { MyLocation } from '../models/Location';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }
    getLocations(): Observable<MyLocation[]>{
      return this._http.get<MyLocation[]>(`${API.LOCATIONS}/GetLocations`)
    }
    AddLocations(location:MyLocation): Observable<any>{
      return this._http.post<any>(`${API.LOCATIONS}/AddLocations`, location)
    }
    DeleteLocations(id : number): Observable<any>{
      return this._http.delete<any>(`${API.LOCATIONS}/DeleteLocations/${id}`)
    }
}

