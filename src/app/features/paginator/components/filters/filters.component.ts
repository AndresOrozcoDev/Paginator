import { Component, Input, OnInit, Output } from '@angular/core';
import { State } from '../../types/location';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

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

  ngOnInit() {
    this.initForm();

    // ✅ Establecer valores iniciales desde la URL
    if (this.initialFilters) {
      this.formFilters.patchValue(this.initialFilters, { emitEvent: false });
    }

    // ✅ Emitir cambios automáticos
    this.formFilters.valueChanges.subscribe(values => {
      this.filterChange.emit(values);
    });
  }

  initForm() {
    this.formFilters = this.fb.group({
      state: [''],
      pageSize: [10],
    });
  }

}
