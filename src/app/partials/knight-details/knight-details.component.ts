import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Knight, KnightClass, KnightElement, Specificity} from "../../lib/models/Knight";
import {Artefact, ArtefactAdapter} from "../../lib/models/Artefact";
import artefactsData from "../../lib/data/artefacts_data.json";
import arayasData from "../../lib/data/arayas_data.json";
import {Araya, ArayaAdapter} from "../../lib/models/Araya";

@Component({
  selector: 'app-knight-details',
  templateUrl: './knight-details.component.html',
  styleUrls: ['./knight-details.component.scss']
})
export class KnightDetailsComponent implements OnChanges {
  @Input() knight: Knight;
  public mappedSpecificities: { [p: string]: Specificity } = {};
  public mappedKnightElement: { [p: string]: KnightElement } = {};
  public mappedKnightClass: { [p: string]: KnightClass } = {};
  public mappedArtefacts: { [p: string]: Artefact } = {};
  public mappedArayas: { [p: string]: Araya } = {};

  public artefacts: Artefact[];
  public arayas: Araya[];

  constructor(private artefactAdapter: ArtefactAdapter,
              private arayaAdapter: ArayaAdapter) {
    Object.entries(Specificity).forEach(spec => {
      this.mappedSpecificities[spec[0]] = spec[1];
    });

    Object.entries(KnightElement).forEach(elmt => {
      this.mappedKnightElement[elmt[0]] = elmt[1];
    });

    Object.entries(KnightClass).forEach(knightC => {
      this.mappedKnightClass[knightC[0]] = knightC[1];
    });
    console.log(this.mappedKnightElement);
    this.artefacts = artefactsData.map(artefact => this.artefactAdapter.adapt(artefact));
    this.artefacts.forEach(artefact => {
      artefact?.id ? this.mappedArtefacts[artefact.id] = artefact : undefined;
    });

    console.log(this.artefacts);
    const people: any[] = [
      { name: "Alice", age: 30, country: "USA" },
      { name: "Bob", age: 25, country: "Canada" },
      { name: "Charlie", age: 35, country: "USA" },
    ];

    const sortedPeople = multiCriteriaSort<any>(people, [
      { criterion: (person) => person.country, order: SortOrder.Descending },
      { criterion: (person) => person.name, order: SortOrder.Descending },
    ]);
    console.log(sortedPeople);
    // console.log( multiCriteriaSort<any>(people, [
    //   { criterion: (person) => person.age, order: SortOrder.Ascending },
    //   // { criterion: (person) => person.name, order: SortOrder.Ascending },
    // ]));

    this.arayas = arayasData.map(araya => this.arayaAdapter.adapt(araya));
    this.arayas.forEach(araya => {
      araya?.id ? this.mappedArayas[araya.id] = araya : undefined;
    });
    console.log(this.mappedArayas);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.knight = changes['knight']?.currentValue;
  }
}

enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

function multiCriteriaSort<T>(arr: T[], criteria: { criterion: (item: T) => any; order: SortOrder }[]) {
  return arr.sort((a: T, b: T) => {
    for (let criterion of criteria) {
      const aValue = criterion.criterion(a);
      const bValue = criterion.criterion(b);

      let result: number;
      if (aValue < bValue) {
        result = -1;
      } else if (aValue > bValue) {
        result = 1;
      } else {
        result = 0;
      }

      if (criterion.order === SortOrder.Descending) {
        result *= -1;
      }

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  });
}
