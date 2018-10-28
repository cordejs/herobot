import * as firebase from "firebase";
import "firebase/database";
import * as connections from "../../../connection";
import { Entity } from "../models/entity";

export class BaseEntityService<T> {
  protected db: firebase.database.Database;

  constructor() {
    const app = firebase.initializeApp(connections.firebaseConnection);
    this.db = app.database();
  }

  /**
   * Save a entity into database based in the informed route
   * @param object
   * @param route
   */
  protected create(route: string, object: T): void {
    this.db.ref(route).push(object);
  }

  /**
   * Searchs for a element, or group of elements based in the path where
   * they are located
   * @param route path where the group of data is located
   * @param key identifier of the data
   */
  protected find(route: string, key: string): Promise<T> {
    return this.db
      .ref(route + "/" + key)
      .once("value")
      .then(function(snapshot) {
        return new Promise<T>(resolve => {
          resolve(snapshot.val());
        });
      });
  }

  protected findAll(route: string): Promise<T> {
    return this.db
      .ref(route + "/")
      .once("value")
      .then(function(snapshot) {
        return new Promise<T>(resolve => {
          resolve(snapshot.val());
        });
      });
  }

  /**
   * Removes data from database
   * @param route path where the entity is located
   * @param id  indentifier of the entity
   */
  protected delete(route: string, id: string): Promise<void> {
    return this.db.ref(route + "/" + id).remove();
  }

  /**
   * Removes a entity(or collection of entities) based in where they are located and a field
   * @param route path where the entity is located
   * @param field atribute to be used in filter
   * @param fieldValue value of the attribute used in filter
   */
  protected deleteByField(
    route: string,
    field: string,
    fieldValue: string
  ): Promise<void> {
    this.db
      .ref(route)
      .orderByChild(field)
      .equalTo(fieldValue)
      .on(
        "child_added",
        snapshot => {
          return new Promise<T>(resolve => {
            snapshot.ref.remove().then(() => resolve());
          });
        },
        function(error: any) {
          console.log(
            "Error when attempting to remove data from firebase" + error.code
          );
        }
      );
    throw new Error("Fail when attempting to remove data from firebase");
  }

  /**
   * Replace all informations of a entity will new values
   * @param route path where the entity is located
   * @param entity object that will be removed
   */
  protected update(route: string, entity: Entity): Promise<void> {
    const id = entity.id;
    this.adjustEntity(entity);
    delete entity.id;
    return this.db.ref(route + "/" + id).update(entity);
  }

  protected set(route: string, entity: Entity): Promise<void> {
    delete entity.id;
    return this.db.ref(route).set(entity);
  }

  /**
   * Removes '_' value from propertie's names of an entity
   * and change their values from undefined (if it be) to null
   * @param entity
   */
  private adjustEntity(entity: Entity) {
    Object.entries(entity).forEach(data => {
      Object.defineProperty(
        entity,
        data[0].replace("_", ""),
        Object.getOwnPropertyDescriptor(entity, data[0])
      );
      delete Object(entity)["_" + data[0]];

      if (data[1] === undefined) data[1] = null;
    });
  }
}
