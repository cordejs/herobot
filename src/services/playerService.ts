import { BaseEntityService } from "./baseEntityService";
import { Player } from "./../models/player";

export class PlayerService extends BaseEntityService<Player> {
  private route = "/players";

  create(player: Player): void {
    super.create(player, this.route);
  }

  findbyUserID(id: string): Promise<Player> {
    return super.findByField(this.route, "userID", id);
  }

  remove(player: Player): Promise<void> {
    return super.delete(this.route, player.id);
  }

  removeByUserID(id: string): Promise<void> {
    return super.deleteByField(this.route, "userID", id);
  }

  updatePlayer(player: Player) {
    return super.update(this.route, player);
  }
}
