import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el nuevo estado cuando cambia el FormControl stateControl', (done) => {
    component.ngOnInit();

    component.stateChanged
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toBe('CA');
        done();
      });

    component.stateControl.setValue('CA');
  });

  it('debería emitir el nuevo tamaño de página cuando cambia pageSizeControl', (done) => {
    component.ngOnInit();

    component.pageSizeChanged
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toBe(25);
        done();
      });

    component.pageSizeControl.setValue(25);
  });

});
