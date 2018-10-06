import { HeroClass } from "../enums/heroclass";

export function getHeroClass(className: string): HeroClass {
    if (className.trim().toUpperCase() === HeroClass.HUNTER.toUpperCase()) return HeroClass.HUNTER;
    else if (className.trim().toUpperCase() === HeroClass.MAGE.toUpperCase()) return HeroClass.MAGE;
    else if (className.trim().toUpperCase() === HeroClass.THIEF.toUpperCase()) return HeroClass.THIEF;
    else if (className.trim().toUpperCase() === HeroClass.WARRIOR.toUpperCase()) return HeroClass.WARRIOR;
    return undefined;
}
