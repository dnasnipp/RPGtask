export type SkillLevelName = 'Нетренированный' | 'Новичок' | 'Ученик' | 'Адепт' | 'Эксперт' | 'Мастер';

// Я хотел воспользоваться встроенным Enum в Typescript, но как оказалось он не может принимать ключи<Числа>
export const SkillLevelNamesEnum: Readonly<SkillLevelName[]> = [
    'Нетренированный', 'Новичок', 'Ученик', 'Адепт', 'Эксперт', 'Мастер'
];

export class Skill {
    public level: number;
    public name: string;

    public constructor(name: string = '', level: number = 0) {
        this.name = name;
        this.level = level;
    }
}