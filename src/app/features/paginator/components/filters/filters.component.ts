import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { State } from '../../types/location';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: false
})
export class FiltersComponent implements OnInit {

  @Input() states: State[] = [];
  @Input() initialFilters!: { state: string; pageSize: number };
  @Output() filterChange = new EventEmitter<{ state: string; pageSize: number }>();

  formFilters!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    if (this.initialFilters) {
      this.formFilters.patchValue(this.initialFilters, { emitEvent: false });
    }

    this.formFilters.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(values => this.filterChange.emit(values));
  }

  private initForm(): void {
    this.formFilters = this.fb.group({
      state: [''],
      pageSize: [10],
    });
  }
}
