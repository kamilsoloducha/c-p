import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Resource, ResourceEnum } from '../common/models/resource';

export const GameActions = createActionGroup({
  source: 'game',
  events: {
    initialize: props<{ resourceType: ResourceEnum }>(),
    finishInitialization: props<{
      resourceElementsCount: number;
    }>(),
    setResult: props<{ player1Card: Resource; player2Card: Resource }>(),
    drawCards: emptyProps(),
  },
});
