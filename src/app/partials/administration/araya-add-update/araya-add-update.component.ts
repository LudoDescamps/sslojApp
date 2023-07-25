import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Knight, KnightAdapter, knightClass, KnightElement, Specificity} from "../../../lib/models/Knight";
import {lastValueFrom, ReplaySubject, Subscription} from "rxjs";
import {KnightService} from "../../../lib/services/knight.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ArtefactService} from "../../../lib/services/artefact.service";
import {Araya, ArayaAdapter} from "../../../lib/models/Araya";
import {ArayaService} from "../../../lib/services/araya.service";

@Component({
  selector: 'app-araya-add-update',
  templateUrl: './araya-add-update.component.html',
  styleUrls: ['./araya-add-update.component.scss']
})
export class ArayaAddUpdateComponent implements OnInit {
  public arayaForm: FormGroup;
  public arayaSelectorForm: FormGroup;
  public restrictionsFormArray: FormArray = new FormArray([]);
  public imagesFormArray: FormArray = new FormArray([]);
  public knights: Knight[];
  public arayas: Araya[];
  public arayasData: Araya[];
  public mappedArayas: { [p: string]: Araya } = {};
  public knightElements: {value: string, viewValue: string}[] = [];
  public knightSpecificities: {value: string, viewValue: string}[] = [];
  public knightClass: {value: string, viewValue: string}[] = [];
  public selectedKAraya: Araya = new Araya();

  data: any;
  filteredArayas: ReplaySubject<Araya[]> = new ReplaySubject<Araya[]>(1);
  private arayaFilterSubscription: Subscription;

  constructor(private arayaAdapter: ArayaAdapter,
              private knightAdapter: KnightAdapter,
              private knightService: KnightService,
              private artefactService: ArtefactService,
              private arayaService: ArayaService,
              private loaderService: NgxUiLoaderService) {
    const knightIdRegex = /^[A-Z_]+$/;

    this.arayaSelectorForm = new FormGroup({
      name: new FormControl(undefined),
      arayaFilter: new FormControl(undefined),
    })
    this.arayaSelectorForm.updateValueAndValidity();

    this.arayaForm = new FormGroup({
      id: new FormControl(undefined, [Validators.required, Validators.pattern(knightIdRegex)]),
      name: new FormControl(undefined, [Validators.required]),
      quality: new FormControl(undefined,[Validators.required]),
      restrictions: this.restrictionsFormArray,
      images: this.imagesFormArray
    });
    this.arayaForm.updateValueAndValidity();

    Object.entries(KnightElement).forEach(elmt => {
      this.knightElements.push({value: elmt[0], viewValue: elmt[1]})
    });

    Object.entries(Specificity).forEach(spec => {
      this.knightSpecificities.push({value: spec[0], viewValue: spec[1]})
    });

    Object.entries(knightClass).forEach(kClass => {
      this.knightClass.push({value: kClass[0], viewValue: kClass[1]})
    });

    this.loaderService.start('getArayas');
    lastValueFrom(this.arayaService.getArayas()).then(arayas => {
      this.arayasData = arayas;
      this.arayas = arayas;
      this.arayasData.forEach(araya => {
        this.mappedArayas[araya.id] = araya;
      });
      // this.createArayasFormArray();
      this.arayaFilterFunction();
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

      this.loaderService.stop('getKnights');
    }, err => {
      console.log(err);
      this.loaderService.stop('getKnights');
    });
  }

  ngOnInit(): void {
    this.arayaFilterSubscription = this.arayaSelectorForm?.get('arayaFilter')?.valueChanges?.subscribe(() => {
      this.arayaFilterFunction();
    });
  }

  save() {
    // let knight = this.arayaAdapter.adapt(this.knightForm.value);
    // const updatedArray = updateObjectById(this.knights, knight.id, knight);
    // this.knightService.saveData(updatedArray)
  }

  addNew() {
    // let knight = this.arayaAdapter.adapt(this.knightForm.value);
    // // const updatedArray = updateObjectById(this.knights, knight.id, knight);
    // this.knights.push(knight);
    // this.knightService.saveData(this.knights)
  }

  updateSelected(event: Event) {
    this.resetForm();

    this.selectedKAraya = this.arayaAdapter.adapt(event);
    this.arayaForm.patchValue(this.selectedKAraya);
    // this.knightForm.get('knightFilter').setValue(this.selectedKnight.name);
    this.arayaForm.updateValueAndValidity();

    this.createRestrictionsFormArray();
    this.createImagesFormArray();
  }

  createRestrictionsFormArray() {
    this.restrictions?.clear();

    this.selectedKAraya?.restriction?.forEach((restriction) => {
      const control = new FormControl(
        restriction, [Validators.required]
      );
      this.restrictions?.push(control);
    });
    this.restrictions?.updateValueAndValidity();
  }

  get restrictions(): FormArray {
    return this.arayaForm.get('specialties') as FormArray;
  }

  addRestriction() {
    const control = new FormControl(undefined, Validators.required);
    this.restrictions.push(control);
    this.arayaForm.markAsDirty();
  }

  removeRestriction(index: number) {
    this.restrictions.removeAt(index);
    this.arayaForm.markAsDirty();
  }

  createImagesFormArray() {
    this.images.clear();

    this.selectedKAraya?.images?.forEach((image) => {
      const control = new FormControl(
        image, [Validators.required]
      );
      this.images.push(control);
    });
  }

  get images(): FormArray {
    return this.arayaForm.get('images') as FormArray;
  }

  addImage() {
    const control =
      new FormControl(undefined, Validators.required);
    this.images.push(control);
    this.arayaForm.markAsDirty();
  }

  removeImage(index: number) {
    this.images.removeAt(index);
    this.arayaForm.markAsDirty();
  }

  /*
  Only one can be recommended
   */
  // checkDisabledRecommendedArtefact(i: number): boolean {
  //   const oneOfIsRecommended = this.arayas.value.some(val => val.recommended === true);
  //   return !(this.artefacts.value[i].recommended === true || !oneOfIsRecommended);
  // }

  /*
  Prevent duplicate araya
   */
  // checkDisabledExistingAraya(arayaId: string): boolean {
  //   return this.arayas.value.some(obj => obj.id === arayaId);
  // }

  resetForm(resetSelector?: boolean) {
    this.selectedKAraya = undefined;
    // this.artefacts.clear();
    this.restrictions?.clear();
    // this.arayas.clear();
    this.images.clear();
    this.arayaForm.reset();

    if (resetSelector) {
      this.arayaSelectorForm?.get('name').setValue(undefined);
      this.arayaSelectorForm.updateValueAndValidity();
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
  private arayaFilterFunction() {
    if (!this.arayas) {
      return;
    }
    // get the search keyword
    let search = this.arayaSelectorForm?.get('arayaFilter')?.value;

    if (!search) {
      this.filteredArayas.next(this.arayas.slice());
      return;
    } else {
      search = search.toString().toLowerCase();
    }
    // filter the banks
    this.filteredArayas.next(
      this.arayas.filter(arayas => arayas.name.toLowerCase().indexOf(search) > -1)
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
