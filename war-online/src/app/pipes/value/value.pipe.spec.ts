import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValuePipe } from './value.pipe';

describe('ValuePipe', () => {
  let valuePipe: ValuePipe;

  beforeEach(() => {
    valuePipe = new ValuePipe();
  });

  [
    { input: 1, output: '1' },
    { input: undefined, output: 'Nobody knows!' },
    { input: Number.NaN, output: 'Nobody knows!' },
  ].forEach((item) => {
    it('should transform value ' + item.input, () => {
      const result = valuePipe.transform(item.input);
      expect(result).toBe(item.output);
    });
  });
});
