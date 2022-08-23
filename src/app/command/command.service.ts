import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  url = 'https://safe.directpay.africa/api';

  constructor(private http: HttpClient) { }

  command(body: any) {
    return this.http.post(`${this.url}/commandes/ponctuel`, body);
  }
  commandWithPrescription(data: any) {
    return this.http.post(`${this.url}/commandes/ordonnance`, data);
  }
}
