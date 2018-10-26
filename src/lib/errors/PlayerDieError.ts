import { PlayStatus } from "../interfaces/playStatus";
import { getTime } from "../utils/time";

/**
 * Treats player death in exploration
 */
export class PlayerDieError extends Error {
  constructor(status: PlayStatus) {
    super();
    super.message =
      `You died after kill ${status.monstersKilled}` +
      `monsters. Got ${status.gold} of gold and ${status.exp} of experience.` +
      `You explored for ${getTime(status.time)}`;
    super.name = "Player Death";
  }
}
