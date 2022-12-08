import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import userM from '../database/models/userM';
import IUserLogin from '../interfaces/IUserLogin';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testa endpoint POST /login', () => {
  const userLogin: IUserLogin = { email: 'admin@admin.com', password: 'secret_admin' };

  describe('Testa o método POST', () => {
    before(() => {
      sinon.stub(userM, 'findOne').resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as userM);
    });

    after(() => {
      sinon.restore();
    });

    it('Testa o login do usuário e retornar o status 200', async () => {
      const res = await chai.request(app).post('/login').send(userLogin);
      
      chai.expect(res.status).to.equal(200);
    });

    it('Testa o login do usuário e retornar um token', async () => {
      const res = await chai.request(app).post('/login').send(userLogin);
      
      chai.expect(res.body).to.have.property('token');
    });
  });
});
