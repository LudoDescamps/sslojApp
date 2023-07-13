import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Araya, ArayaAdapter} from "../models/Araya";

@Injectable({
  providedIn: 'root'
})
export class ArayaService {
  arayas: Araya[];

  constructor(private http: HttpClient,
              private arayaAdapter: ArayaAdapter) {}

  getArayas(): Observable<Araya[]> {
    return this.http.get<Araya[]>('assets/data/arayas_data.json').pipe(
      map((data: any[]) => data.map(item => this.arayaAdapter.adapt(item))));
  }

  addAraya(araya: Araya) {
    this.arayas.push(araya);
    this.saveData();
  }

  updateAraya(araya: Araya) {
    // Code pour mettre à jour l'élément dans this.arayas
    this.saveData();
  }

  deleteAraya(araya: Araya) {
    // Code pour supprimer l'élément de this.arayas
    this.saveData();
  }

  saveData() {
    const json = JSON.stringify(this.arayas);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'arayas_data.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
