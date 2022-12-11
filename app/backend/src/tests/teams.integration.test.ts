import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import teamsM from '../database/models/teamsM';
import { onlyAllTeams } from './teams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

chai.use(chaiHttp);

describe('Testa endpoint GET /teams', () => {
  describe('Testando o método GET', () => {

    beforeEach(async () => {
      sinon.stub(teamsM, 'findAll').resolves(onlyAllTeams as teamsM[]);
    });

    afterEach(() => sinon.restore());

    it('Testando se da rota /teams são retornados 16 times', async () => {
      const res = await chai.request(app).get('/teams');
      chai.expect(res).status(200);
      chai.expect(res.body).length(16);
    });

    it('Verifica os times estão organizados por Id', async () => {
      const res = await chai.request(app).get('/teams');
      chai.expect(res).status(200);
      res.body.forEach(({id}: {id: number}, i: number) => {
        chai.expect(id).equal(i + 1);
      });
    });
  });
});