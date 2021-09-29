import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandResult, QueryResult, Resource } from './api.models';

type QueryResponse = Resource | Array<Resource>

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) {
  }

  sendQuery<T extends QueryResponse>(url: string): Observable<QueryResult<T>> {
    return this.http.get<QueryResult<T>>(url);
  }

  sendCommand<T>(url: string, payload: unknown): Observable<CommandResult<T>> {
    return this.http.post<CommandResult<T>>(url, payload);
  }
}
