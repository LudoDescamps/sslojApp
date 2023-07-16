import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {KnightElement} from "../../lib/models/Knight";

@Component({
  selector: 'app-element-filter',
  templateUrl: './element-filter.component.html',
  styleUrls: ['./element-filter.component.scss']
})
export class ElementFilterComponent implements OnInit, OnChanges {
  @Output() public elementFilter: EventEmitter<string> = new EventEmitter();

  public knightElementsArray: string[] = []
  public mappedKnightElement: { [p: string]: KnightElement } = {};
  public selectedFilter: string;
  constructor() {

    Object.entries(KnightElement).forEach(elmt => {
      this.mappedKnightElement[elmt[0]] = elmt[1];
      this.knightElementsArray.push(elmt[0]);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  selectedElementFilterChange(element?: string) {
    this.selectedFilter = element;
    this.elementFilter.emit(element);
  }
}
