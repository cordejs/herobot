import { BaseEntity, Connection } from "typeorm";
import { dbConnection } from "../../dbconn";

/**
 * Contains all method for a CRUD of an entity
 */
export class BaseEntityService<T extends BaseEntity> {
  protected db: Connection;

  constructor() {
    this.db = dbConnection;
  }

  /**
   * Save a entity into database based in the informed route
   * @param object
   * @param route
   */
  protected save(entity: T): Promise<T> {
    return entity
      .save()
      .then(entity => Promise.resolve(entity))
      .catch(error => {
        console.error("Fail in entity save" + error);
        return Promise.reject(error);
      });
  }

  /**
   * Searchs for a element, or group of elements based in the path where
   * they are located
   * @param route path where the group of data is located
   * @param key identifier of the data
   */
  protected find(id: number, type: new () => T): Promise<T> {
    return this.db.manager.findOne<T>(type, id);
  }

  protected findAll(): Promise<T[]> {
    let entity: new () => T;
    return this.db.getRepository(entity).find();
  }

  /**
   * Removes data from database
   * @param route path where the entity is located
   * @param id  indentifier of the entity
   */
  protected delete(entity: T): Promise<void> {
    return entity
      .remove()
      .then(() => Promise.resolve())
      .catch(error => {
        console.error("can not remove entity:" + error);
        return Promise.reject(error);
      });
  }

  protected deleteById(id: number): Promise<void> {
    let entity: new () => T;
    return this.db
      .getRepository(entity)
      .delete(id)
      .then(() => Promise.resolve())
      .catch(error => {
        console.error(error);
        return Promise.reject(error);
      });
  }
}
