import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Pagination } from '../../types/location';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent {

  @Input() pagination!: Pagination;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    if (!this.pagination?.totalPages) return [];
    const { currentPage, totalPages } = this.pagination;

    // Mostrar un rango acotado de páginas (por ejemplo, +-2)
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  changePage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages || page === this.pagination.currentPage) return;
    this.pageChanged.emit(page);
  }

}
