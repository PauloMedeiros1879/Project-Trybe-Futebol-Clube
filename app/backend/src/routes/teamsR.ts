import * as express from 'express';
import TeamsModel from '../database/models/teamsM';
import TeamService from '../services/teamsS';
import TeamController from '../controllers/teamsC';

require('express-async-errors');

const teams = new TeamController(new TeamService(TeamsModel));
const teamsRouter = express.Router();

teamsRouter.get('/', (req, res) => teams.findAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teams.findIdTeams(req, res));

export default teamsRouter;
