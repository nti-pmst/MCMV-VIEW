import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import { HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.css']
})
export class ApresentacaoComponent implements OnInit {

  grupo: string;
  sorteados: any[] = [];
  pessoasApresentadas: any[] = [];
  indexAtual: any = 0;
  pessoaAtual: any;
  sorteioSubscription: Subscription;

  constructor(private route: ActivatedRoute, private http: Http) {
    route.params.subscribe(params => {
      this.grupo = params['grupo'];
      this.getSorteados(this.grupo);
    });
  }

  ngOnInit() {
  }

  getSorteados(grupo) {
    this.sorteioSubscription = this.http.get('http://192.168.0.131:5000/sorteio/' + grupo)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.sorteados = res.contemplados;
        this.apresentarPessoas(this.indexAtual);
      });
  }

  @HostListener('window: keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if(event.keyCode === 37 && this.indexAtual > 0){
      event.preventDefault();
      this.pessoaAnterior();
    } else if(event.keyCode === 39 && this.indexAtual < this.sorteados.length){
      event.preventDefault();
      this.proximaPessoa();
    }
  }

  proximaPessoa(){
    this.pessoasApresentadas.unshift(this.sorteados[this.indexAtual]);
    this.indexAtual++;
    this.apresentarPessoas(this.indexAtual);
    console.log('próximo: ' + this.indexAtual);

    if(this.pessoasApresentadas.length == this.sorteados.length){
      localStorage.setItem(this.grupo, "true");
    }
  }

  pessoaAnterior(){
    this.pessoasApresentadas.shift();
    this.indexAtual--;
    this.apresentarPessoas(this.indexAtual);
    console.log('ant: ' + this.indexAtual);
  }

  apresentarPessoas(index) {
    this.pessoaAtual = this.sorteados[index];
  }
}
