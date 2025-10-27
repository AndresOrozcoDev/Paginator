import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { State } from '../../types/location';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: false
})
export class FiltersComponent implements OnInit {

  @Input() states: State[] = [];

  formFilters!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();    
  }

  private initForm(): void {
    this.formFilters = this.fb.group({
      state: [''],
      pageSize: [10],
    });
  }
}
