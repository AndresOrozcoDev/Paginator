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

    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      const start = Math.max(3, this.currentPage - 1);
      const end = Math.min(this.totalPages - 2, this.currentPage + 1);

      if (start > 3) pages.push('...');

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < this.totalPages - 2) pages.push('...');

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
