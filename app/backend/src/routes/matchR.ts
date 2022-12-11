import * as express from 'express';
import Match from '../database/models/matchesM';
import MatchService from '../services/matchS';
import MatchController from '../controllers/matchC';

require('express-async-errors');

const matches = new MatchController(new MatchService(Match));
const matchesRouter = express.Router();

matchesRouter.get('/', (req, res) => matches.match(req, res));

export default matchesRouter;
