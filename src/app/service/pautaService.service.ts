import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pauta } from '../model/pauta';

@Injectable({
  providedIn: 'root',
})
export class PautaService {

    constructor(private http : HttpClient) {}

    novaPauta(pauta:Pauta) : Observable<any> {
        return this.http.post<Pauta>("http://localhost:8080/novaPauta", pauta);
    }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:8080/pautas");
    }
}