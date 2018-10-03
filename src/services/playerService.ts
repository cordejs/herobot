import { BaseEntityService } from "../services/baseEntityService";
import { Player } from "../interfaces/player";

export class PlayerService extends BaseEntityService<Player> {
  private route = "/players";

  createPlayer(player: Player): Promise<void> {
    return super.set(this.route + "/" + player.id, player);
  }

  findbyUserID(id: string): Promise<Player> {
     return super.find(this.route, id);
  }

  remove(player: Player): Promise<void> {
    return super.delete(this.route, player.id.toString());
  }

  removeByUserID(id: string): Promise<void> {
    return super.deleteByField(this.route, "userID", id);
  }

  updatePlayer(player: Player) {
    return super.update(this.route, player);
  }
}
