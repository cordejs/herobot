export class Player {
  private _name: String;
  private _level: number;
  private _class: String;
  private _xp: number;
  private _gold: number;
  private _global_rank: number;

  constructor(name: string) {
    this._name = name;
  }

  public get name(): String {
    return this._name;
  }

  public set name(value: String) {
    this._name = value;
  }

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    this._level = value;
  }

  public get class(): String {
    return this._class;
  }

  public set class(value: String) {
    this._class = value;
  }

  public get xp(): number {
    return this._xp;
  }

  public set xp(value: number) {
    this._xp = value;
  }

  public get gold(): number {
    return this._gold;
  }

  public set gold(value: number) {
    this._gold = value;
  }

  public get global_rank(): number {
    return this._global_rank;
  }

  public set global_rank(value: number) {
    this._global_rank = value;
  }
}
