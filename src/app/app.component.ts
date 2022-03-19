import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Associado } from './model/associado';
import { Pauta } from './model/pauta';
import { Voto } from './model/voto';
import { AssociadoService } from './service/associadoService.service';
import { PautaService } from './service/pautaService.service';
import { VotacaoService } from './service/votacaoService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vote-view';
  pautaSelecionada = '';
  votacaoSelecionada = ''
  associadoSelecionado = '';
  votoSelecionado = '';
  novaPauta = false;
  novaVotacao = false;
  associadosList: any[] = [];
  pautaList = [] as any;
  votacaoList = [] as any;
  pauta = new FormControl();
  pautaModel = new Pauta('');
  associadoModel = new Associado('', '');
  votoModel = new Voto();
  associado = new FormControl(null, [Validators.required]);
  cpf = new FormControl(null, [Validators.required]);

  ngOnInit() {
    this.asssociadoService.getAll().subscribe(associado => {
      this.associadosList = associado;
    })

    this.pautaService.getAll().subscribe(pauta => {
      this.pautaList = pauta;
    })

    this.votacaoService.getAll().subscribe(votacao => {
      if(votacao[0].status == "ATIVA") {
        this.votacaoList = votacao;
      }})
  }

  constructor(private asssociadoService: AssociadoService, private pautaService: PautaService, public votacaoService: VotacaoService) {}
  

  criarNovaPauta() : any {
    this.novaPauta = true;
    this.pautaModel.nome = this.pauta.value;
    this.pautaService.novaPauta(this.pautaModel).subscribe(response => {
      console.log(response);
    });
  }

  criarNovaVotacao() : any {
    this.novaVotacao = true;
    this.votacaoService.novaVotacao(this.pautaModel).subscribe(response => {});
    this.ngOnInit();
    setTimeout(() => {
      this.votacaoService.mudarStatusVotacao(this.votoModel).subscribe(response => {
        alert("A votação encerrou");
        this.ngOnInit();
      })}, 60000);
    
  }

  criarNovoAssociado() : any {
    this.associadoModel.nome = this.associado.value;
    this.associadoModel.cpf = this.cpf.value;
    this.asssociadoService.novoAssociado(this.associadoModel).subscribe(response => {
      console.log(response);
    });
  }

  votar() : any {
    this.votoModel.associadoID = this.associadoSelecionado;
    this.votoModel.votacaoID = this.votacaoSelecionada;
    this.votoModel.pautaID = this.pautaSelecionada;
    this.votoModel.voto = this.votoSelecionado;
    this.votacaoService.votar(this.votoModel).subscribe(response => {
      console.log(response);
    })
  }
}
