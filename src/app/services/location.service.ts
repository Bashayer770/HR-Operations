import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API } from '.';
import { Department } from '../models/Department';
import { MyLocation } from '../models/MyLocation';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }
    getLocations(): Observable<MyLocation[]>{
      return this._http.get<MyLocation[]>(`${API.LOCATIONS}/GetLocations`)
    }
    addLocations(location:MyLocation): Observable<any>{
      return this._http.post<string>(`${API.LOCATIONS}/AddLocation`, location)
    }
    deleteLocations(id : number): Observable<any>{
      return this._http.delete<string>(`${API.LOCATIONS}/DeleteLocation/${id}`)
    }
    updateLocations(location:MyLocation): Observable<any>{
      return this._http.put<any>(`${API.LOCATIONS}/UpdateLocation`, location)
    }

}

