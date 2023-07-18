import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Knight, KnightAdapter, knightClass, KnightElement, Specificity} from "../../../lib/models/Knight";
import {Artefact} from "../../../lib/models/Artefact";
import {lastValueFrom, ReplaySubject, Subscription} from "rxjs";
import {KnightService} from "../../../lib/services/knight.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ArtefactService} from "../../../lib/services/artefact.service";
import {Araya} from "../../../lib/models/Araya";
import {ArayaService} from "../../../lib/services/araya.service";

@Component({
  selector: 'app-knight-add-update',
  templateUrl: './knight-add-update.component.html',
  styleUrls: ['./knight-add-update.component.scss']
})
export class KnightAddUpdateComponent implements OnInit {
  public knightForm: FormGroup;
  public knightSelectorForm: FormGroup;
  public artefactsFormArray: FormArray = new FormArray([]);
  public arayasFormArray: FormArray = new FormArray([]);
  public imagesFormArray: FormArray = new FormArray([]);
  public knights: Knight[];
  public artefactsData: Artefact[];
  public arayasData: Araya[];
  public mappedArtefacts: { [p: string]: Artefact } = {};
  public mappedArayas: { [p: string]: Araya } = {};
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
              private arayaService: ArayaService,
              private loaderService: NgxUiLoaderService) {
    const knightIdRegex = /^[A-Z_]+$/;

    this.knightSelectorForm = new FormGroup({
      name: new FormControl(undefined),
      knightFilter: new FormControl(undefined),
    })
    this.knightSelectorForm.updateValueAndValidity();

    this.knightForm = new FormGroup({
      id: new FormControl(undefined, [Validators.required, Validators.pattern(knightIdRegex)]),
      name: new FormControl(undefined, [Validators.required]),
      constellationName: new FormControl(undefined,[Validators.required]),
      element: new FormControl(undefined, [Validators.required]),
      knightClass: new FormControl(undefined, [Validators.required]),
      artefacts: this.artefactsFormArray,
      arayas: this.arayasFormArray,
      constellation: new FormControl(undefined),
      specialties: new FormArray([]),
      images: this.imagesFormArray,
      specificity: new FormControl(undefined, [Validators.required]),
      advice: new FormControl(undefined),
      topAgainst: new FormControl(undefined),
      neverUseAgainst: new FormControl(undefined),
      recommendedConstellationLevel: new FormControl(undefined),
      recommendedArmourLevel: new FormControl(undefined)
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

    this.loaderService.start('getArayas');
    lastValueFrom(this.arayaService.getArayas()).then(arayas => {
      this.arayasData = arayas;
      this.arayasData.forEach(araya => {
        this.mappedArayas[araya.id] = araya;
      });
      this.createArayasFormArray();
      this.loaderService.stop('getArayas');
    }, err => {
      console.log(err);
      this.loaderService.stop('getArayas');
    });

    this.loaderService.start('getKnights');
    lastValueFrom(this.knightService.getKnights()).then(knights => {
      this.knights = knights;

      this.knights.sort(
        (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
      this.knightFilterFunction();
      this.loaderService.stop('getKnights');
    }, err => {
      console.log(err);
      this.loaderService.stop('getKnights');
    });
  }

  ngOnInit(): void {
    this.knightFilterSubscription = this.knightForm?.get('knightFilter')?.valueChanges?.subscribe(() => {
      this.knightFilterFunction();
    });
  }

  save() {
    let knight = this.knightAdapter.adapt(this.knightForm.value);
    const updatedArray = updateObjectById(this.knights, knight.id, knight);
    this.knightService.saveData(updatedArray)
  }

  addNew() {
    let knight = this.knightAdapter.adapt(this.knightForm.value);
    // const updatedArray = updateObjectById(this.knights, knight.id, knight);
    this.knights.push(knight);
    this.knightService.saveData(this.knights)
  }

  updateSelected(event: Event) {
    console.log(event);
    this.resetForm();

    this.selectedKnight = this.knightAdapter.adapt(event);
    this.knightForm.patchValue(this.selectedKnight);
    // this.knightForm.get('knightFilter').setValue(this.selectedKnight.name);
    this.knightForm.updateValueAndValidity();

    this.createSpecialtiesFormArray();
    this.createImagesFormArray();
    this.createArayasFormArray();
    this.createArtefactsFormArray();
  }

  createArtefactsFormArray() {
    this.artefacts.clear();

    this.selectedKnight?.artefacts?.forEach((artefact) => {
      const control = new FormGroup({
        id: new FormControl(artefact.id),
        recommended: new FormControl(artefact.recommended),
      });
      this.artefacts.push(control);
      });
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

  createSpecialtiesFormArray() {
    this.specialties.clear();

    this.selectedKnight?.specialties?.forEach((specialty) => {
      const control = new FormControl(
        specialty, [Validators.required]
      );
      this.specialties.push(control);
    });
    this.specialties.updateValueAndValidity();
  }

  get specialties(): FormArray {
    return this.knightForm.get('specialties') as FormArray;
  }

  addSpecialty() {
    const control = new FormControl(undefined, Validators.required);
    this.specialties.push(control);
    this.knightForm.markAsDirty();
  }

  removeSpecialty(index: number) {
    this.specialties.removeAt(index);
    this.knightForm.markAsDirty();
  }

  createArayasFormArray() {
    this.arayas.clear();

    this.selectedKnight?.arayas?.forEach((araya) => {
      const control = new FormGroup({
        id: new FormControl(araya.id),
        recommended: new FormControl(araya.recommended),
      });
      this.arayas.push(control);
    });
  }

  get arayas(): FormArray {
    return this.knightForm.get('arayas') as FormArray;
  }

  addAraya() {
    const control = new FormGroup({
      id: new FormControl(undefined, Validators.required),
      recommended: new FormControl(undefined),
    });
    this.arayas.push(control);
    this.knightForm.markAsDirty();
  }

  removeAraya(index: number) {
    this.arayas.removeAt(index);
    this.knightForm.markAsDirty();
  }

  createImagesFormArray() {
    this.images.clear();

    this.selectedKnight?.images?.forEach((image) => {
      const control = new FormControl(
        image, [Validators.required]
      );
      this.images.push(control);
    });
  }

  get images(): FormArray {
    return this.knightForm.get('images') as FormArray;
  }

  addImage() {
    const control =
      new FormControl(undefined, Validators.required);
    this.images.push(control);
    this.knightForm.markAsDirty();
  }

  removeImage(index: number) {
    this.images.removeAt(index);
    this.knightForm.markAsDirty();
  }

  /*
  Only one can be recommended
   */
  checkDisabledRecommendedArtefact(i: number): boolean {
    const oneOfIsRecommended = this.arayas.value.some(val => val.recommended === true);
    return !(this.artefacts.value[i].recommended === true || !oneOfIsRecommended);
  }

  /*
  Prevent duplicate araya
   */
  checkDisabledExistingAraya(arayaId: string): boolean {
    return this.arayas.value.some(obj => obj.id === arayaId);
  }

  resetForm(resetSelector?: boolean) {
    this.selectedKnight = undefined;
    this.artefacts.clear();
    this.specialties.clear();
    this.arayas.clear();
    this.images.clear();
    this.knightForm.reset();

    if (resetSelector) {
      this.knightSelectorForm?.get('name').setValue(undefined);
      this.knightSelectorForm.updateValueAndValidity();
    }
  }

  sortByProperties(arr: object[], properties: (keyof object)[]): object[] {
    return arr.slice().sort((a, b) => {
      for (let property of properties) {
        if (a[property] < b[property]) {
          return -1;
        }
        if (a[property] > b[property]) {
          return 1;
        }
      }
      return 0;
    });
  }

    /*
    Knight search filter
     */
  private knightFilterFunction() {
    if (!this.knights) {
      return;
    }
    // get the search keyword
    let search: string;
    if (this.knightSelectorForm?.get('knightFilter')?.value) {
       search = this.knightSelectorForm?.get('knightFilter')?.value;
     }

    if (!search) {
      this.filteredKnights.next(this.knights.slice());
      return;
    } else {
      search = search.toString().toLowerCase();
    }
    // filter the banks
    this.filteredKnights.next(
      this.knights.filter(knight => knight.name.toLowerCase().indexOf(search) > -1)
    );
  }
}

function updateObjectById(arr: Knight[], id: string, updatedObject: Partial<Knight>): Knight[] {
  return arr.map(obj => {
    if (obj.id === id) {
      return { ...obj, ...updatedObject };
    }
    return obj;
  });
}
