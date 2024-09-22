import { Resource, ResourceEnum } from '../../common/models/resource';

export function compareCards(card1: Resource, card2: Resource): number {
  const card1Value = getValue(card1);
  const card2Value = getValue(card2);
  if (card1Value == card2Value || (Number.isNaN(card1Value) && Number.isNaN(card2Value))) {
    return 0;
  }
  if (Number.isNaN(card1Value)) {
    return 2;
  }
  if (Number.isNaN(card2Value)) {
    return 1;
  }
  return card1Value > card2Value ? 1 : 2;
}

function getValue(card: Resource): number {
  if ('mass' in card) return card.mass;
  else return card.crew;
}
