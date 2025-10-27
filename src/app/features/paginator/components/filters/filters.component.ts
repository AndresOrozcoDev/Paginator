import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { State } from '../../types/location';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: false
})
export class FiltersComponent implements OnInit {

  @Input() states: State[] = [];
  @Output() stateChanged = new EventEmitter<string | null>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  stateControl = new FormControl('');
  pageSizeControl = new FormControl<number>(10);

  constructor() { }

  ngOnInit(): void {
    this.stateControl.valueChanges.subscribe(value => {
      this.stateChanged.emit(value ?? null);
    });

    this.pageSizeControl.valueChanges.subscribe(value => {
      if (value != null) {
        this.pageSizeChanged.emit(value);
      }
    });
  }

  initFromQueryParams(state: string | null, pageSize: number) {
    this.stateControl.setValue(state ?? '', { emitEvent: false });
    this.pageSizeControl.setValue(pageSize ?? 10, { emitEvent: false });
  }
}
