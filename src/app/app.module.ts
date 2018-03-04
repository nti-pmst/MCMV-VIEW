import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BusyModule } from "angular2-busy";

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ApresentacaoComponent } from './apresentacao/apresentacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ApresentacaoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', component: InicioComponent },
    { path: 'apresentacao/:grupo', component: ApresentacaoComponent }]),
    HttpModule,
    FormsModule,
    BusyModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
