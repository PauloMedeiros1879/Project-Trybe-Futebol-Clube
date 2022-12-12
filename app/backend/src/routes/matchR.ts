import * as express from 'express';
import Match from '../database/models/matchesM';
import MatchService from '../services/matchS';
import MatchController from '../controllers/matchC';
import { auth } from '../middlewares/jwt';

require('express-async-errors');

const matches = new MatchController(new MatchService(Match));
const matchesRouter = express.Router();

matchesRouter.get('/', (req, res) => matches.match(req, res));
matchesRouter.post('/', auth, (req, res) => matches.matchCreate(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matches.matchUpdate(req, res));
export default matchesRouter;
