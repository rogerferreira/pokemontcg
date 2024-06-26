import {Environment} from "../app/interfaces/environment.interface";

export const environment: Environment = {
  production: false,
  api: 'https://api.pokemontcg.io/v2/cards',
  mincards: 24,
  maxcards: 60,
  maxrepetname: 4
};
