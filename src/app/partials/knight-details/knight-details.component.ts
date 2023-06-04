import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Knight, KnightElement, Specificity} from "../../lib/models/Knight";
import {Artefact, ArtefactAdapter} from "../../lib/models/Artefact";
import artefactsData from "../../lib/models/artefacts_data.json";

@Component({
  selector: 'app-knight-details',
  templateUrl: './knight-details.component.html',
  styleUrls: ['./knight-details.component.scss']
})
export class KnightDetailsComponent implements OnChanges {
  @Input() knight: Knight;
  public mappedSpecificities: { [p: string]: any } = {};
  public mappedKnightElement: { [p: string]: any } = {};
  public mappedArtefacts: { [p: string]: any } = {};
  public artefacts: Artefact[];

  constructor(private artefactAdapter: ArtefactAdapter) {
    Object.entries(Specificity).forEach(spec => {
      this.mappedSpecificities[spec[0]] = spec[1];
    });

    Object.entries(KnightElement).forEach(elmt => {
      this.mappedKnightElement[elmt[0]] = elmt[1];
    });

    this.artefacts = artefactsData.map(artefact => this.artefactAdapter.adapt(artefact));
    this.artefacts.forEach(artefact => {
      artefact?.id ? this.mappedArtefacts[artefact.id] = artefact : undefined;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.knight = changes['knight']?.currentValue;
  }
}
