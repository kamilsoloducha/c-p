import { Component, Input } from '@angular/core';
import { Result } from '../../common/models/results';

@Component({
  selector: 'app-points-counter',
  templateUrl: './points-counter.component.html',
  styleUrl: './points-counter.component.scss',
})
export class PointsCounterComponent {
  @Input() results: Result[] = [];
}
