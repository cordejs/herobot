"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proficienceType_1 = require("../enums/proficienceType");
class Player {
    constructor(name, heroclass) {
        this._name = name;
        this._heroClass = heroclass;
        this._level = 1;
        this._levelMaxXp = 100;
        this._damageProficience = {
            level: 0,
            levelMaxXp: 200,
            type: proficienceType_1.ProficienceType.DAMAGE,
            xp: 0
        };
        this._shieldProficience = {
            level: 0,
            levelMaxXp: 200,
            type: proficienceType_1.ProficienceType.SHIELD,
            xp: 0
        };
    }
    /**
     * Return the total amount of damage that the player give
     */
    damage() {
        return this._weapon.damage + this._damageProficience.level / 2;
    }
    /**
     * Return the total amount of defence
     */
    defence() {
        return this._shield.defence + this._shieldProficience.level / 2;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get xp() {
        return this._xp;
    }
    set xp(value) {
        this._xp = value;
    }
    get levelMaxXp() {
        return this._levelMaxXp;
    }
    set levelMaxXp(value) {
        this._levelMaxXp = value;
    }
    get heroClass() {
        return this._heroClass;
    }
    set heroClass(value) {
        this._heroClass = value;
    }
    get gold() {
        return this._gold;
    }
    set gold(value) {
        this._gold = value;
    }
    get shield() {
        return this._shield;
    }
    set shield(value) {
        this._shield = value;
    }
    get weapon() {
        return this._weapon;
    }
    set weapon(value) {
        this._weapon = value;
    }
    get damageProficience() {
        return this._damageProficience;
    }
    set damageProficience(value) {
        this._damageProficience = value;
    }
    get shieldProficience() {
        return this._shieldProficience;
    }
    set shieldProficience(value) {
        this._shieldProficience = value;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map