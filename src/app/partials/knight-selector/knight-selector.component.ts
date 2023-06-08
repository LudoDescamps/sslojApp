import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Artefact, ArtefactAdapter} from "../../lib/models/Artefact";
import {Knight, KnightAdapter} from "../../lib/models/Knight";

import data from './../../lib/models/data.json';
import artefactsData from './../../lib/models/artefacts_data.json';

@Component({
  selector: 'app-knight-selector',
  templateUrl: './knight-selector.component.html',
  styleUrls: ['./knight-selector.component.scss']
})
export class KnightSelectorComponent implements OnInit {
  public knightForm: FormGroup;
  public knights: Knight[];
  public artefacts: Artefact[] | undefined;
  public selectedKnight: Knight = new Knight();

  data: any;

  constructor(private knightAdapter: KnightAdapter,
              private artefactAdapter: ArtefactAdapter) {

    console.log(data);
    this.knights = data.map(knight => this.knightAdapter.adapt(knight));
    this.knights.sort(
      (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
    console.log(this.knights);

    console.log(artefactsData);
    this.artefacts = artefactsData.map(artefact => this.artefactAdapter.adapt(artefact));
    console.log(this.artefacts);

    this.knightForm = new FormGroup({
      name: new FormControl(undefined),
    })
    this.knightForm.updateValueAndValidity();
  }

  ngOnInit(): void {
    // TODO à enlever
    this.knightForm.get('name')?.setValue(this.knights.find(item => item.name === 'Poséidon'));
    this.selectedKnight = this.knights.find(item => item.name === 'Poséidon');
  }

  updateSelected(event: Event) {
    console.log(event);
    this.selectedKnight = this.knightAdapter.adapt(event);
    // this.selectedKnight = event as Knight;
  }

}
