import { Component, inject } from '@angular/core';
import { ResourceEnum } from '../../common/models/resource';
import { GameState } from '../../store/state';
import { Store } from '@ngrx/store';
import { GameActions } from '../../store/actions';

@Component({
  selector: 'app-resource-selector',
  templateUrl: './resource-selector.component.html',
  styleUrl: './resource-selector.component.scss',
})
export class ResourceSelectorComponent {
  private readonly store = inject(Store<GameState>);

  options: { value: ResourceEnum; label: string }[] = [
    { value: ResourceEnum.People, label: 'People' },
    { value: ResourceEnum.Starships, label: 'Starships' },
  ];

  private _selected: ResourceEnum | undefined;
  public get selected(): ResourceEnum | undefined {
    return this._selected;
  }
  public set selected(value: ResourceEnum | undefined) {
    this._selected = value;

    if (value !== undefined) {
      this.store.dispatch(GameActions.initialize({ resourceType: value }));
    }
  }
}
