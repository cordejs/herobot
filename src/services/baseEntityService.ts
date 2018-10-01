import * as firebase from "firebase";
import "firebase/database";
import * as connections from "./../../connection";

export class BaseEntityService<T> {
  private db: firebase.database.Database;

  constructor() {
    const app = firebase.initializeApp(connections.firebaseConnection);
    this.db = app.database();
  }

  /**
   * Save a entity into database based in the informed route
   * @param object
   * @param route
   */
  create(object: T, route: string): void {
    this.db.ref(route).push(object);
  }
}
