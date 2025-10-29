import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { Pagination } from '../../types/location';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const dummyPagination: Pagination = {
    total: 50,
    totalPages: 10,
    currentPage: 5,
    pageSize: 5
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('pages getter', () => {
    it('should return empty array if pagination is undefined', () => {
      component.pagination = undefined as any;
      expect(component.pages).toEqual([]);
    });

    it('should return empty array if totalPages is 0', () => {
      component.pagination = { ...dummyPagination, totalPages: 0 };
      expect(component.pages).toEqual([]);
    });

    it('should return range centered around currentPage (middle case)', () => {
      component.pagination = { ...dummyPagination, currentPage: 5, totalPages: 10 };
      const pages = component.pages;
      expect(pages).toEqual([3, 4, 5, 6, 7]);
    });

    it('should clamp start at 1 when currentPage near beginning', () => {
      component.pagination = { ...dummyPagination, currentPage: 2, totalPages: 10 };
      const pages = component.pages;
      expect(pages).toEqual([1, 2, 3, 4]);
    });

    it('should clamp end at totalPages when near end', () => {
      component.pagination = { ...dummyPagination, currentPage: 9, totalPages: 10 };
      const pages = component.pages;
      expect(pages).toEqual([7, 8, 9, 10]);
    });
  });

  describe('changePage()', () => {
    beforeEach(() => {
      component.pagination = { ...dummyPagination };
      spyOn(component.pageChanged, 'emit');
    });

    it('should emit new page when valid and different', () => {
      component.changePage(6);
      expect(component.pageChanged.emit).toHaveBeenCalledWith(6);
    });

    it('should not emit when page < 1', () => {
      component.changePage(0);
      expect(component.pageChanged.emit).not.toHaveBeenCalled();
    });

    it('should not emit when page > totalPages', () => {
      component.changePage(999);
      expect(component.pageChanged.emit).not.toHaveBeenCalled();
    });

    it('should not emit when page equals currentPage', () => {
      component.changePage(5);
      expect(component.pageChanged.emit).not.toHaveBeenCalled();
    });
  });

});
