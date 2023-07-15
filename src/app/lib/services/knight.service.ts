import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Knight, KnightAdapter} from "../models/Knight";

@Injectable({
  providedIn: 'root'
})
export class KnightService {

  knights: Knight[];

  constructor(private http: HttpClient,
              private knightAdapter: KnightAdapter) {}

  getKnights(): Observable<Knight[]> {
    return this.http.get<Knight[]>('assets/data/knights_data.json').pipe(
      map((data: any[]) => data.map(item => this.knightAdapter.adapt(item))));
  }

  addKnight(knight: Knight) {
    this.knights.push(knight);
    // this.saveData();
  }

  updateKnight(knight: Knight) {
    // Code pour mettre à jour l'élément dans this.knights
    // this.saveData();
  }

  deleteKnight(knight: Knight) {
    // Code pour supprimer l'élément de this.knights
    // this.saveData();
  }

  saveData(knights: Knight[]) {
    const json = JSON.stringify(knights);
    // const json = JSON.stringify(this.knights);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'knights_data.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
