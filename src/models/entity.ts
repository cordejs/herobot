export class Entity {
  private _id: string;

  public get id() {
    return this._id;
  }
  public set id(value) {
    this._id = value;
  }
}
