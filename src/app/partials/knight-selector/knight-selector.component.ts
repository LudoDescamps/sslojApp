import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Artefact, ArtefactAdapter} from "../../lib/models/Artefact";
import {Knight, KnightAdapter, KnightElement} from "../../lib/models/Knight";

import artefactsData from '../../lib/data/artefacts_data.json';
import {lastValueFrom, ReplaySubject, Subscription} from "rxjs";
import {KnightService} from "../../lib/services/knight.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-knight-selector',
  templateUrl: './knight-selector.component.html',
  styleUrls: ['./knight-selector.component.scss']
})
export class KnightSelectorComponent implements OnInit {
  public knightSelectorForm: FormGroup;
  public knights: Knight[];
  public artefacts: Artefact[] | undefined;
  public selectedKnight: Knight = new Knight();

  data: any;
  filteredKnights: ReplaySubject<Knight[]> = new ReplaySubject<Knight[]>(1);
  private knightFilterSubscription: Subscription;

  constructor(private knightAdapter: KnightAdapter,
              private knightService: KnightService,
              private loaderService: NgxUiLoaderService,
              private artefactAdapter: ArtefactAdapter) {

    this.knightSelectorForm = new FormGroup({
      name: new FormControl(undefined),
      knightFilter: new FormControl(undefined),
    })
    this.knightSelectorForm.updateValueAndValidity();

    this.loaderService.start('getKnights');
    lastValueFrom(this.knightService.getKnights()).then(knights => {
      this.knights = knights;

      this.knightSelectorForm.get('name')?.setValue(this.knights.find(item => item.name === 'Poséidon'));
      this.selectedKnight = this.knights.find(item => item.name === 'Poséidon');

      this.knights.sort(
        (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
      this.knightFilterFunction();
      this.loaderService.stop('getKnights');
    }, err => {
      console.log(err);
      this.loaderService.stop('getKnights');
    });

    // console.log(this.knights.filter(item => item.element === KnightElement.LUMIERE));

    this.artefacts = artefactsData.map(artefact => this.artefactAdapter.adapt(artefact));
  }

  ngOnInit(): void {
    this.knightFilterSubscription = this.knightSelectorForm?.get('knightFilter')?.valueChanges?.subscribe(() => {
      this.knightFilterFunction();
    });
  }

  updateSelected(event: Event) {
    this.selectedKnight = this.knightAdapter.adapt(event);
  }

  /*
  Knight search filter
   */
  private knightFilterFunction() {
    if (!this.knights) {
      return;
    }
    // get the search keyword
    let search = this.knightSelectorForm?.get('knightFilter')?.value;
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
