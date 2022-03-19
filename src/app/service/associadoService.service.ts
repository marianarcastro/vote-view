import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associado } from '../model/associado';

@Injectable({
  providedIn: 'root',
})
export class AssociadoService {

    constructor(private http : HttpClient) {}

    novoAssociado(associado:Associado) : Observable<any> {
        return this.http.post<Associado>("http://localhost:8080/novoAssociado", associado);
    }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:8080/associados");
    }
}