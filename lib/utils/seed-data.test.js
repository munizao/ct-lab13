const { parseTypeLine } = require('./seed-data');

describe('seed-data module', () => {
  const typeLine = 'Creature — Human Warrior';
  const typeLine2 = 'Artifact';
  it('gets types out of typeline', () => {
    expect(parseTypeLine(typeLine, 0)).toEqual(['Creature']);
  });
  it('gets subtypes out of typeline', () => {
    expect(parseTypeLine(typeLine, 1)).toEqual(['Human', 'Warrior']);
  });
  it('gets empty array from empty typeline', () => {
    expect(parseTypeLine('', 0)).toEqual([]);
  });
  it('gets empty array from undefined typeline', () => {
    expect(parseTypeLine(undefined, 0)).toEqual([]);
  });
  it('gets type from typeline with no dash', () => {
    expect(parseTypeLine(typeLine2, 0)).toEqual(['Artifact']);
  });
  it('gets empty subtypes from typeline with no dash', () => {
    expect(parseTypeLine(typeLine2, 1)).toEqual([]);
  });
});

