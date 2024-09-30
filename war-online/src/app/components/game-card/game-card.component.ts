import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  @Input() cardName: string | undefined = '';
  @Input() attributeName: string | undefined = '';
  @Input() attributeValue: number | undefined = undefined;
}
