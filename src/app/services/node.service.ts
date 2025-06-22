import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API } from '.';
import { Department } from '../models/Department';
import { MyNode } from '../models/MyNode';
@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private _http: HttpClient) { }
    getNodes(): Observable<MyNode[]>{
      return this._http.get<MyNode[]>(`${API.NODES}/GetNodes`)
    }
    addNodes(node:MyNode): Observable<any>{
      return this._http.post<string>(`${API.NODES}/AddNode`, node)
    }
    deleteNodes(id : string): Observable<any>{
      return this._http.delete<string>(`${API.NODES}/DeleteNode/${id}`)
    }
    updateNodes(node:MyNode): Observable<any>{
      return this._http.put<any>(`${API.NODES}/UpdateNode`, node)
    }
      checkIfIdExists(id: string) {
      return this._http.get<boolean>(`${API.NODES}/CheckIdExists/${id}`)
  }

}

