import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Knight, KnightAdapter} from "../models/Knight";

@Injectable({
  providedIn: 'root'
})
export class KnightService {

  items: any[];

  constructor(private http: HttpClient,
              private knightAdapter: KnightAdapter) {}

  ngOnInit() {
    this.getKnights();
  }

  getKnights(): Observable<Knight[]> {
    return this.http.get<Knight[]>('assets/data/knightsData.json').pipe(
      map((data: any[]) => data.map(item => this.knightAdapter.adapt(item))));

    // this.http.get<any[]>('assets/data.json').subscribe(
    //   (data) => {
    //     this.items = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
  }

  addItem(item: any) {
    this.items.push(item);
    this.saveData();
  }

  updateItem(item: any) {
    // Code pour mettre à jour l'élément dans this.items
    this.saveData();
  }

  deleteItem(item: any) {
    // Code pour supprimer l'élément de this.items
    this.saveData();
  }

  saveData() {
    const json = JSON.stringify(this.items);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'data.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
