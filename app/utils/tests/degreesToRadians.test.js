import degreesToRadians from '../degreesToRadians';

describe('asyncInjectors', () => {
  it('should convert 45 to 0.7853981633974483', () => {
    expect(degreesToRadians(45)).toEqual(0.7853981633974483);
  })
})
