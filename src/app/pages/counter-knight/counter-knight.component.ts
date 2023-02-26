import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-counter-knight',
  templateUrl: './counter-knight.component.html',
  styleUrls: ['./counter-knight.component.scss']
})
export class CounterKnightComponent implements OnInit {

  public knightForm: FormGroup;

  constructor() {

    this.knightForm = new FormGroup({
      name: new FormControl(undefined),
    })
   }

  ngOnInit(): void {
  }

  updateSelected(event: Event) {
    console.log(event);        
  }

}
