import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Artefact, ArtefactAdapter} from "../models/Artefact";

@Injectable({
  providedIn: 'root'
})
export class ArtefactService {
  artefacts: Artefact[];

  constructor(private http: HttpClient,
              private artefactAdapter: ArtefactAdapter) {}

  getArtefacts(): Observable<Artefact[]> {
    return this.http.get<Artefact[]>('assets/data/artefacts_data.json').pipe(
      map((data: any[]) => data.map(item => this.artefactAdapter.adapt(item))));
  }

  addArtefact(artefact: Artefact) {
    this.artefacts.push(artefact);
    this.saveData();
  }

  updateArtefact(artefact: Artefact) {
    // Code pour mettre à jour l'élément dans this.artefacts
    this.saveData();
  }

  deleteArtefact(artefact: Artefact) {
    // Code pour supprimer l'élément de this.artefacts
    this.saveData();
  }

  saveData() {
    const json = JSON.stringify(this.artefacts);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'artefacts_data.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
