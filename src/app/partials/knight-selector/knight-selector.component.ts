import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Artefact, ArtefactAdapter} from "../../lib/models/Artefact";
import {Knight, KnightAdapter, KnightElement} from "../../lib/models/Knight";

import data from '../../lib/data/data.json';
import artefactsData from '../../lib/data/artefacts_data.json';
import {ReplaySubject, Subscription} from "rxjs";

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
  filteredKnights: ReplaySubject<Knight[]> = new ReplaySubject<Knight[]>(1);
  private knightFilterSubscription: Subscription;

  constructor(private knightAdapter: KnightAdapter,
              private artefactAdapter: ArtefactAdapter) {

    console.log(data);
    this.knights = data.map(knight => this.knightAdapter.adapt(knight));
    this.knights.sort(
      (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
    console.log(this.knights);

    console.log(this.knights.filter(item => item.element === KnightElement.LUMIERE));
    console.log(artefactsData);
    this.artefacts = artefactsData.map(artefact => this.artefactAdapter.adapt(artefact));
    console.log(this.artefacts);

    this.knightForm = new FormGroup({
      name: new FormControl(undefined),
      knightFilter: new FormControl(undefined),
    })
    this.knightForm.updateValueAndValidity();
    this.knightFilterFunction();
  }

  ngOnInit(): void {
    this.knightFilterSubscription = this.knightForm?.get('knightFilter')?.valueChanges?.subscribe(() => {
      this.knightFilterFunction();
    });
    // TODO à enlever
    this.knightForm.get('name')?.setValue(this.knights.find(item => item.name === 'Poséidon'));
    this.selectedKnight = this.knights.find(item => item.name === 'Poséidon');

  }

  updateSelected(event: Event) {
    console.log(event);
    this.selectedKnight = this.knightAdapter.adapt(event);
    // this.selectedKnight = event as Knight;
  }

  private knightFilterFunction() {
    if (!this.knights) {
      return;
    }
    // get the search keyword
    let search = this.knightForm?.get('knightFilter')?.value;
    if (!search) {
      this.filteredKnights.next(this.knights.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredKnights.next(
      this.knights.filter(organisation => organisation.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
