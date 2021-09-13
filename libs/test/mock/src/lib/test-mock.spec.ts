import { testMock } from './test-mock';

describe('testMock', () => {
  it('should work', () => {
    expect(testMock()).toEqual('test-mock');
  });
});
