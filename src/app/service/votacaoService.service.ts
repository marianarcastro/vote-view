import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associado } from '../model/associado';
import { Pauta } from '../model/pauta';
import { Voto } from '../model/voto';

@Injectable()
export class VotacaoService {

    constructor(private http : HttpClient) {}
    

    novaVotacao(pauta:Pauta) : Observable<any> {
      return this.http.post<Pauta>("http://localhost:8080/novaVotacao", pauta);
    }

    mudarStatusVotacao(voto:Voto) : Observable<any> {
      return this.http.post<Voto>("http://localhost:8080/mudarStatusVotacao", voto);
    }

    votar(voto:Voto) : Observable<any> {
      return this.http.post<Voto>("http://localhost:8080/votar", voto);
    }

    getAll() : Observable<any> {
      return this.http.get("http://localhost:8080/votacoes");
    }

    kafka() : Observable<any> {
      return this.http.get("http://localhost:8080/kafka/send");
    }
    
}