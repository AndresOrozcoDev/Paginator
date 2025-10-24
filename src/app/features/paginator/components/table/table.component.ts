import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { City } from '../../types/location';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TableComponent {

  @Input() cities: City[] = [];

}
