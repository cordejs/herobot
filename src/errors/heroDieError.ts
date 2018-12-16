import { PlayStatus } from "../interfaces/playStatus";

/**
 * Treats hero death in exploration
 */
export class HeroDieError extends Error {
  constructor(status: PlayStatus) {
    super();
    super.message =
      `You died after kill ${status.monstersKilled} ` +
      `monsters. Got ${status.gold} of gold and ${status.exp} of experience.`;
    super.name = "Player Death";
  }
}
