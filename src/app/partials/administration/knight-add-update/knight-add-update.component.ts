import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Knight, KnightAdapter, knightClass, KnightElement, Specificity} from "../../../lib/models/Knight";
import {Artefact, ArtefactAdapter} from "../../../lib/models/Artefact";
import {lastValueFrom, ReplaySubject, Subscription} from "rxjs";
import {KnightService} from "../../../lib/services/knight.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ArtefactService} from "../../../lib/services/artefact.service";

@Component({
  selector: 'app-knight-add-update',
  templateUrl: './knight-add-update.component.html',
  styleUrls: ['./knight-add-update.component.scss']
})
export class KnightAddUpdateComponent implements OnInit {
  public knightForm: FormGroup;
  public artefactsFormArray: FormArray = new FormArray([]);
  public knights: Knight[];
  public artefactsData: Artefact[];
  public mappedArtefacts: { [p: string]: Artefact } = {};
  public knightElements: {value: string, viewValue: string}[] = [];
  public knightSpecificities: {value: string, viewValue: string}[] = [];
  public knightClass: {value: string, viewValue: string}[] = [];
  public selectedKnight: Knight = new Knight();

  data: any;
  filteredKnights: ReplaySubject<Knight[]> = new ReplaySubject<Knight[]>(1);
  private knightFilterSubscription: Subscription;

  constructor(private knightAdapter: KnightAdapter,
              private knightService: KnightService,
              private artefactService: ArtefactService,
              private loaderService: NgxUiLoaderService) {

    this.knightForm = new FormGroup({
      id: new FormControl(undefined),
      name: new FormControl(undefined),
      constellationName: new FormControl(undefined),
      element: new FormControl(undefined),
      knightClass: new FormControl(undefined),
      artefacts: this.artefactsFormArray,
      arayas: new FormControl(undefined),
      constellation: new FormControl(undefined),
      specialties: new FormControl(undefined),
      images: new FormControl(undefined),
      specificity: new FormControl(undefined),
      advice: new FormControl(undefined),
      topAgainst: new FormControl(undefined),
      neverUseAgainst: new FormControl(undefined),
      minConstellationLevel: new FormControl(undefined),
      minArmourLevel: new FormControl(undefined),
    });
    this.knightForm.updateValueAndValidity();

    Object.entries(KnightElement).forEach(elmt => {
      this.knightElements.push({value: elmt[0], viewValue: elmt[1]})
    });

    Object.entries(Specificity).forEach(spec => {
      this.knightSpecificities.push({value: spec[0], viewValue: spec[1]})
    });

    Object.entries(knightClass).forEach(kClass => {
      this.knightClass.push({value: kClass[0], viewValue: kClass[1]})
    });

    this.loaderService.start('getKnights');
    lastValueFrom(this.knightService.getKnights()).then(knights => {
      this.knights = knights;
      console.log('getKnights')
      // this.knightForm.get('name')?.setValue(this.knights.find(item => item.name === 'Poséidon'));
      this.selectedKnight = this.knights.find(item => item.name === 'Poséidon');

      this.knightForm.patchValue(this.selectedKnight);

      if (this.selectedKnight.artefacts?.length > 0) {
        this.createArtefactsFormArray();
      }

      this.knights.sort(
        (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
      this.knightFilterFunction();
      this.loaderService.stop('getKnights');
    }, err => {
      console.log(err);
      this.loaderService.stop('getKnights');
    });

    this.loaderService.start('getArtefacts');
    lastValueFrom(this.artefactService.getArtefacts()).then(artefacts => {
      this.artefactsData = artefacts;
      this.artefactsData.forEach(artefact => {
        this.mappedArtefacts[artefact.id] = artefact;
      });
      console.log('getArtefacts')
      // if (this.selectedKnight) {
      //   this.knightForm.patchValue(this.selectedKnight);
      // }

      this.loaderService.stop('getArtefacts');
    }, err => {
      console.log(err);
      this.loaderService.stop('getArtefacts');
    });
  }

  ngOnInit(): void {
    this.knightFilterSubscription = this.knightForm?.get('knightFilter')?.valueChanges?.subscribe(() => {
      this.knightFilterFunction();
    });
  }

  save() {
    console.log(this.knightForm.value);
    this.knightService.saveData(this.knightForm.value)
  }

  updateSelected(event: Event) {
    this.selectedKnight = this.knightAdapter.adapt(event);
  }

  createArtefactsFormArray() {
    this.artefacts.clear();

    this.selectedKnight.artefacts?.forEach((artefact) => {
      const control = new FormGroup({
        id: new FormControl(artefact.id),
        recommended: new FormControl(artefact.recommended),
      });
      this.artefacts.push(control);
      });
    console.log(this.artefacts);
  }

  get artefacts(): FormArray {
    return this.knightForm.get('artefacts') as FormArray;
  }

  addArtefact() {
    const control = new FormGroup({
      id: new FormControl(undefined, Validators.required),
      recommended: new FormControl(undefined),
    });
    this.artefacts.push(control);
    this.knightForm.markAsDirty();
  }

  removeArtefact(index: number) {
    this.artefacts.removeAt(index);
    this.knightForm.markAsDirty();
  }

  /*
  Only one can be recommended
   */
  checkDisabledRecommendedArtefact(i: number): boolean {
    const oneOfIsRecommended = this.artefacts.value.some(val => val.recommended === true);
    return !(this.artefacts.value[i].recommended === true || !oneOfIsRecommended);
  }

  resetForm() {
    this.artefacts.clear();
    this.knightForm.reset();
  }

    /*
    Knight search filter
     */
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

  protected readonly Object = Object;
}
