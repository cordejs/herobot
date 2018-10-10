import { HeroClass } from "../enums/heroclass";

/**
 * Inform the HeroClass of an string
 * @param className string name of a class
 */
export function getHeroClass(className: string): HeroClass {
    if (className.trim().toUpperCase() === HeroClass.HUNTER.toUpperCase()) return HeroClass.HUNTER;
    else if (className.trim().toUpperCase() === HeroClass.MAGE.toUpperCase()) return HeroClass.MAGE;
    else if (className.trim().toUpperCase() === HeroClass.THIEF.toUpperCase()) return HeroClass.THIEF;
    else if (className.trim().toUpperCase() === HeroClass.WARRIOR.toUpperCase()) return HeroClass.WARRIOR;
    return undefined;
}
