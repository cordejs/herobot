import { BaseEntityService } from "./baseEntityService";
import { Player } from "./../models/player";

export class PlayerService extends BaseEntityService<Player> {
  private route = "/players";

  create(player: Player) {
    super.create(player, this.route);
  }
}
