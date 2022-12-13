import * as express from 'express';
import MatchM from '../database/models/matchesM';
import TeamM from '../database/models/teamsM';
import LeaderBoardController from '../controllers/leaderboard';
import LeaderBoardService from '../services/leaderboard';

require('express-async-errors');

const leaderBoard = new LeaderBoardController(new LeaderBoardService(TeamM, MatchM));
const leaderR = express.Router();

leaderR.get('/', (req, res) => leaderBoard.leader(req, res));
leaderR.get('/home', (req, res) => leaderBoard.leaderHome(req, res));
leaderR.get('/away', (req, res) => leaderBoard.leaderAway(req, res));

export default leaderR;
