import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandResult, QueryResult } from './api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) {
  }

  sendQuery<T>(url: string): Observable<QueryResult<T>> {
    return this.http.get<QueryResult<T>>(url);
  }

  sendCommand<T>(url: string, payload: unknown): Observable<CommandResult<T>> {
    return this.http.post<CommandResult<T>>(url, payload);
  }
}
