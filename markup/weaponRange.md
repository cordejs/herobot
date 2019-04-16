# Weapons range definition

| Type    | Range | Can use Shield ? |
| ------- | ----- | ---------------- |
| Sword   | 0     | Yes              |
| Spear   | 1     | No               |
| Staff   | 2     | Yes              |
| Bow     | 3     | No               |

## Range Attribute

Each value of range is an additional hit that the hero give to a monster. So, if you are using a `sword` for instance, when you go to fight a monster, you will attack, and then receive a damage. If you are using a `spear`,
you will attack twice before receive a damage. It will only happen in the beggining of a fight, after the additional hit, the battle will be defined by attack / be attacked.
