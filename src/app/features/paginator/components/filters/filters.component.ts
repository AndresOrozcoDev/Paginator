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

    // Escucha independiente para "state"
    this.formFilters.get('state')!.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(state => this.filterChange.emit({
        state,
        pageSize: this.formFilters.get('pageSize')!.value
      }));

    // Escucha independiente para "pageSize"
    this.formFilters.get('pageSize')!.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(pageSize => this.filterChange.emit({
        state: this.formFilters.get('state')!.value,
        pageSize
      }));
  }

  private initForm(): void {
    this.formFilters = this.fb.group({
      state: [''],
      pageSize: [10],
    });
  }
}
