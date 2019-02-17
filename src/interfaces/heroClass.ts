import { ClassName, ClassNameEvolve } from "../enums/className";

interface IHeroClass {
  name: ClassName | ClassNameEvolve;
  damagebuff: number;
  shieldbuff: number;
  hpbuff: number;
  goldbuff: number;
  expbuff: number;
  attackspeedbuff: number;
}

///////////////////////////////
///// Classes Buffs //////////
/////////////////////////////

export const Warrior: IHeroClass = {
  name: ClassName.WARRIOR,
  attackspeedbuff: 0,
  damagebuff: 0,
  expbuff: 0,
  goldbuff: 0,
  hpbuff: 5,
  shieldbuff: 0
};

export const Mage: IHeroClass = {
  name: ClassName.MAGE,
  attackspeedbuff: 0,
  damagebuff: 0,
  expbuff: 3,
  goldbuff: 0,
  hpbuff: 0,
  shieldbuff: 0
};

export const Thief: IHeroClass = {
  name: ClassName.THIEF,
  attackspeedbuff: 0,
  damagebuff: 0,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 0,
  shieldbuff: 0
};

export const Archer: IHeroClass = {
  name: ClassName.ARCHER,
  attackspeedbuff: 0,
  damagebuff: 5,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 0,
  shieldbuff: 0
};

export const Knight: IHeroClass = {
  name: ClassNameEvolve.KNIGHT,
  attackspeedbuff: 0,
  damagebuff: 0,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 10,
  shieldbuff: 0
};

export const Paladin: IHeroClass = {
  name: ClassNameEvolve.PALADIN,
  attackspeedbuff: 0,
  damagebuff: 5,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 5,
  shieldbuff: 0
};

export const Sorcerer: IHeroClass = {
  name: ClassNameEvolve.PALADIN,
  attackspeedbuff: 0,
  damagebuff: 5,
  expbuff: 3,
  goldbuff: 0,
  hpbuff: 0,
  shieldbuff: 0
};

export const Necro: IHeroClass = {
  name: ClassNameEvolve.NECRO,
  attackspeedbuff: 0,
  damagebuff: 0,
  expbuff: 0,
  goldbuff: 0,
  hpbuff: 5,
  shieldbuff: 0
};

export const Ladin: IHeroClass = {
  name: ClassNameEvolve.LADIN,
  attackspeedbuff: 0,
  damagebuff: 0,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 5,
  shieldbuff: 0
};

export const Ninja: IHeroClass = {
  name: ClassNameEvolve.NINJA,
  attackspeedbuff: 0,
  damagebuff: 5,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 0,
  shieldbuff: 0
};

export const Hunter: IHeroClass = {
  name: ClassNameEvolve.HUNTER,
  attackspeedbuff: 1,
  damagebuff: 10,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 0,
  shieldbuff: 0
};

export const Trickster: IHeroClass = {
  name: ClassNameEvolve.HUNTER,
  attackspeedbuff: 1,
  damagebuff: 5,
  expbuff: 0,
  goldbuff: 1,
  hpbuff: 5,
  shieldbuff: 0
};
