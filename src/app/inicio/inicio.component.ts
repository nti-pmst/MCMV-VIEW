import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import "rxjs/add/operator/map";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  sorteando: Boolean;
  processado: Boolean;
  semente: string;
  sorteioSubscription: Subscription;

  constructor(private http: Http) { 
    this.processado = !!localStorage.getItem('processado');
    this.semente = localStorage.getItem('semente');
  }

  ngOnInit() {
  }

  realizarSorteio(semente){
    localStorage.setItem('semente', semente);
    this.sorteando = true;
    this.sorteioSubscription = this.http.get('http://192.168.0.131:5000/sorteio/gerar/' + semente)
    .map(res => res.json())
    .subscribe(res => {
      this.sorteando = false;
      this.processado = true;
      localStorage.setItem('processado', this.processado.toString());
    });
  }

  isDisabled(grupo: string): boolean{
    return !!localStorage.getItem(grupo);
  }
}
