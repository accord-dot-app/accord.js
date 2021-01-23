import 'mocha';
import { assert, expect } from 'chai';
import { Client } from '../../src/client/client';

describe('client/client', () => {
  let client: Client;

  beforeEach(() => client = new Client());

  describe('login', () => {
    it('no token, throws error', async () => {    
      try {
        await client.login(null);
        assert.fail();
      } catch {}
    });
  });
});
