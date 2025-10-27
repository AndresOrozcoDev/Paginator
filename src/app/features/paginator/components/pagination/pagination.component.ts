import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent implements OnChanges {

  ngOnChanges(): void {
    this.generatePages();
  }

  private generatePages(): void { }

}
