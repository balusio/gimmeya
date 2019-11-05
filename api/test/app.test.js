const request = require('supertest')
const app = require('../index');
describe('check the app ', () => {
  it('is loaded', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(500);

  })
})
