const request = require('supertest');
const app = require('../index');
const moxios = require('moxios');
describe('Test the root path', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('It should response the GET method', async () => {
    moxios.stubRequest(`${process.env.API_URL}tokens`, {
      status: 200,
      response: {
        data: {
          access_token: '1234556',
        },
      },
    });
    request(app).get('/login').set('Authorization', '1234566').then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    });
  });
});
