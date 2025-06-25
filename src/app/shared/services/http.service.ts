import { inject, Injectable } from '@angular/core';
import { Client } from '../interfaces/client.interface';
import { Account } from '../interfaces/account.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);

  getClientsList(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.API_BASE}/clients`)
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${environment.API_BASE}/clients?client=${clientId}`);
  }

  getAccountsList(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.API_BASE}/accounts`)
  }

  createClient(body: Client): Observable<any> {
    return this.http.post<any>(`${environment.API_BASE}/accounts`, body)
  }
}
