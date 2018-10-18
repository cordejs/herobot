import { Action } from "../enums/action";

/**
 * Used to define the the last time that the player sent the command "status"
 * @description When a player is sent to explore or train, the game save that time.
 * Each time that the user say "status" the bot calcs how much time the player is training or exploring,
 * and say how much exp the player got in that time. This interface save the informations sent to the
 * when he say the command and when the command "back" is said, the bot get all informations from here
 * and save in player data.
 */
export interface PlayStatus {
  action: Action;
  gold?: number;
  monstersKilled?: number;
  exp: number;
  time: number;
}
