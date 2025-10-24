import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent implements OnChanges {

  @Input() totalPages = 0;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: (number | string)[] = [];

  ngOnChanges(): void {
    this.generatePages();
  }

  private generatePages(): void {
  const pages: (number | string)[] = [];

  if (this.totalPages === 0) {
    this.pages = [];
    return;
  }

  // Siempre mostrar primera página
  pages.push(1);

  // Si hay más de 2 páginas, construimos el patrón < 1 ... current ... total >
  if (this.totalPages > 2) {
    // Si la actual no es ni la primera ni la última
    if (this.currentPage > 2 && this.currentPage < this.totalPages - 1) {
      pages.push('...');
      pages.push(this.currentPage);
      pages.push('...');
    } else {
      // Si está al inicio o final, solo mostrar un separador
      pages.push('...');
    }
  }

  // Si hay más de una página, mostrar la última
  if (this.totalPages > 1) {
    pages.push(this.totalPages);
  }

  this.pages = pages;
}

  changePage(page: number | string): void {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) this.pageChange.emit(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.pageChange.emit(this.currentPage + 1);
  }
  
}
