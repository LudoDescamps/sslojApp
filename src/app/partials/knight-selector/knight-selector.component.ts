import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Artefact, ArtefactAdapter} from "../../lib/models/Artefact";
import {Knight, KnightAdapter} from "../../lib/models/Knight";

import {lastValueFrom, ReplaySubject, Subscription} from "rxjs";
import {KnightService} from "../../lib/services/knight.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ArtefactService} from "../../lib/services/artefact.service";
import {FilterByParam} from "../../lib/functions/filter-by-param";

@Component({
  selector: 'app-knight-selector',
  templateUrl: './knight-selector.component.html',
  styleUrls: ['./knight-selector.component.scss']
})
export class KnightSelectorComponent implements OnInit {
  public knightSelectorForm: FormGroup;
  public knights: Knight[];
  public artefactsData: Artefact[];
  public selectedKnight: Knight = new Knight();
  public mappedArtefacts: { [p: string]: Artefact } = {};

  data: any;
  filteredKnights: ReplaySubject<Knight[]> = new ReplaySubject<Knight[]>(1);
  private knightFilterSubscription: Subscription;

  constructor(private knightAdapter: KnightAdapter,
              private knightService: KnightService,
              private artefactService: ArtefactService,
              private artefactAdapter: ArtefactAdapter,
              private loaderService: NgxUiLoaderService,
              public filterByParam: FilterByParam) {

    /**
     * Init form
     */
    this.knightSelectorForm = new FormGroup({
      name: new FormControl(undefined),
      knightFilter: new FormControl(undefined),
    })
    this.knightSelectorForm.updateValueAndValidity();

    /**
     * Retrieve all knights
     */
    this.elementFilterChange();

    this.loaderService.start('getArtefacts');
    lastValueFrom(this.artefactService.getArtefacts()).then(artefacts => {
      this.artefactsData = artefacts;
      this.artefactsData.forEach(artefact => {
        this.mappedArtefacts[artefact.id] = artefact;
      });

      this.loaderService.stop('getArtefacts');
    }, err => {
      console.log(err);
      this.loaderService.stop('getArtefacts');
    });
  }

  ngOnInit(): void {
    // Search filter
    this.knightFilterSubscription = this.knightSelectorForm?.get('knightFilter')?.valueChanges?.subscribe(() => {
      this.knightFilterFunction();
    });
  }

  updateSelected(event: Event) {
    this.selectedKnight = this.knightAdapter.adapt(event);
  }

  elementFilterChange(element?: string) {
    /**
     * Retrieve all knights
     */
    this.loaderService.start('getKnights');
    lastValueFrom(this.knightService.getKnights()).then(knights => {
      this.knights = knights;

      if (element) {
        this.knights = this.filterByParam.filterByElement(this.knights, 'element', element);
      }

      // Sort knights by name
      this.knights.sort(
        (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);

      this.knightSelectorForm.get('name')?.setValue(this.knights?.[0]);
      this.selectedKnight = this.knights?.[0];

      this.knightFilterFunction();
      this.loaderService.stop('getKnights');
    }, err => {
      console.log(err);
      this.loaderService.stop('getKnights');
    });
  }

  /**
  * Knight search filter
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
