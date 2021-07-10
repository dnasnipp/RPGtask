import React, {useEffect, useRef, useState} from 'react';
import './App.scss';

import TextInput from './components/form/TextInput/TextInput';
import LabeledInput from "./components/form/LabeledInput/LabeledInput";
import FormSection from "./components/form/FormSection/FormSection";
import ClickInput from "./components/form/ClickInput/ClickInput";
import Btn from "./components/form/Btn/Btn";
import Bar from "./components/Bar/Bar";
import {BaseEntityStats, Entity, EntityStatsKeys} from "./types/Entity";
import {Skill, SkillLevelNamesEnum} from "./types/Skill";


const initialCharacterState: Entity = {
    name: '',
    baseStats: {
        strength: 0,
        agility: 0,
        mind: 0,
        charisma: 0
    },
    currentHealth: 0,
    maxHealth: 0,
    skills: {
        strength: {
            'attack': new Skill('Атака')
        },
        agility: {
            'stealth': new Skill('Скрытность'),
            'bow': new Skill('Стрельба из лука')
        },
        mind: {
            'learning': new Skill('Обучаемость'),
            'survival': new Skill('Выживание'),
            'medicine': new Skill('Медицина')
        },
        charisma: {
            'fear': new Skill('Запугивание'),
            'insight': new Skill('Проницательность'),
            'look': new Skill('Внешний вид'),
            'manipulation': new Skill('Манипулирование')
        }
    }
}

function App() {
    const [rpgCharacter, setRpgCharacter] = useState<Entity>({...initialCharacterState});

    const dmgPerAttack: number = 1;
    const applyDamageToEntity = (entity: Entity, setEntity: (newState: Entity) => void) => {
        return function (damageCount: number,) {
            let newCurrentHealth = entity.currentHealth - damageCount;

            newCurrentHealth = newCurrentHealth < 0 ? 0 : newCurrentHealth;

            setEntity({...entity, currentHealth: newCurrentHealth});
        }
    }

    const changeEntityName = (entity: Entity, setEntity: (newState: Entity) => void) => {
        return function (newName: string) {
            setEntity({...entity, name: newName});
        }
    }

    const changeEntityBaseStat = (stat: EntityStatsKeys, entity: Entity, setEntity: (newState: Entity) => void) => {
        return function (newValue: number) {
            let newBaseStats: BaseEntityStats = {...entity.baseStats};

            newBaseStats[stat] = newValue;

            setEntity(
                {
                    ...entity,
                    baseStats: newBaseStats
                }
            );
        }
    }

    const changeSkillLevel = (skill: string, dependencyStat: EntityStatsKeys, entity: Entity, setEntity: (newState: Entity) => void) => {
        return function (newSkillLevel: number) {
            let skills = {
                ...entity.skills
            };

            skills[dependencyStat][skill].level = newSkillLevel;

            setEntity(
                {
                    ...entity,
                    skills
                }
            )
        }
    }

    // update skills after change stat
    useEffect(() => {
        for (const [baseStatKey, statSkills] of Object.entries(rpgCharacter.skills)) {

            for (const [skillKey, skill] of Object.entries(statSkills)) {
                const currentBaseStatValue: number = rpgCharacter.baseStats[baseStatKey as EntityStatsKeys];

                if (skill.level > currentBaseStatValue) {
                    let skills = {...rpgCharacter.skills};
                    skills[baseStatKey as EntityStatsKeys][skillKey].level = currentBaseStatValue;

                    setRpgCharacter({
                        ...rpgCharacter,
                        skills
                    });
                }
            }
        }
    }, [rpgCharacter.baseStats]);

    // recalculate current health after change stat
    const baseHealth: number = 3;

    useEffect(() => {
        const health: number = rpgCharacter.baseStats.strength + baseHealth;

        setRpgCharacter(
            {
                ...rpgCharacter,
                maxHealth: health,
                currentHealth: health
            }
        );
    }, [rpgCharacter.baseStats.strength]);


    // import|export

    const characterImport: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (e.target.files !== null) {
            const file: File = e.target.files[0];

            if (file.name.split('.').pop() === 'json') {

                file.text().then(fileText => {
                    try {
                        let importedState: Entity = JSON.parse(fileText);

                        if(importedState.maxHealth === 0 && importedState.currentHealth === 0) {
                            importedState.maxHealth = importedState.baseStats.strength + baseHealth;
                            importedState.currentHealth = importedState.maxHealth;
                        }

                        setRpgCharacter(importedState);
                    } catch (e) {
                        console.error(e);
                        setRpgCharacter(initialCharacterState);
                    }

                }).catch(e => console.error(e));
            }

            e.target.value = '';
        }
    }

    const exportBtnRef = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        const btn: HTMLAnchorElement  | null = exportBtnRef.current;

        if(btn !== null) {
            btn.href = URL.createObjectURL(new Blob([JSON.stringify(rpgCharacter)], {type: 'application/json'}));
        }
    }, [rpgCharacter]);

    return (
        <div className="app">
            <div className="app__constructor">
                <div className="app__stats">
                    <div className="app__col">
                        <FormSection>
                            <LabeledInput title={`Имя:`}>
                                <TextInput
                                    placeholder={"John"}
                                    value={rpgCharacter.name}
                                    onChange={changeEntityName(rpgCharacter, setRpgCharacter)}
                                />
                            </LabeledInput>
                        </FormSection>
                        <FormSection>
                            <LabeledInput title={"Сила"} titleCenter={true}>
                                <ClickInput
                                    minValue={0}
                                    value={rpgCharacter.baseStats.strength}
                                    onChangeValue={changeEntityBaseStat('strength', rpgCharacter, setRpgCharacter)}
                                />
                            </LabeledInput>
                        </FormSection>
                        <FormSection>
                            <LabeledInput title={"Ловкость"} titleCenter={true}>
                                <ClickInput
                                    minValue={0}
                                    value={rpgCharacter.baseStats.agility}
                                    onChangeValue={changeEntityBaseStat('agility', rpgCharacter, setRpgCharacter)}
                                />
                            </LabeledInput>
                        </FormSection>
                        <FormSection>
                            <LabeledInput title={"Интеллект"} titleCenter={true}>
                                <ClickInput
                                    minValue={0}
                                    value={rpgCharacter.baseStats.mind}
                                    onChangeValue={changeEntityBaseStat('mind', rpgCharacter, setRpgCharacter)}
                                />
                            </LabeledInput>
                        </FormSection>
                        <FormSection>
                            <LabeledInput title={"Харизма"} titleCenter={true}>
                                <ClickInput
                                    minValue={0}
                                    value={rpgCharacter.baseStats.charisma}
                                    onChangeValue={changeEntityBaseStat('charisma', rpgCharacter, setRpgCharacter)}
                                />
                            </LabeledInput>
                        </FormSection>
                        <FormSection>
                            <div className={"parallel"}>
                                <label>
                                    <div className="btn">Импорт</div>
                                    <input
                                        type="file"
                                        style={{display: 'none'}}
                                        onChange={characterImport}
                                    />
                                </label>
                                <a
                                    href="#"
                                    download
                                    className="btn"
                                    ref={exportBtnRef}
                                >
                                    Экспорт
                                </a>
                            </div>
                        </FormSection>
                    </div>
                    <div className="app__col">
                        <FormSection>
                            <LabeledInput title={"Текущее здоровье:"}>
                                <Bar
                                    currentValue={rpgCharacter.currentHealth}
                                    maxValue={rpgCharacter.maxHealth}
                                    color={"rgb(220,0,0)"}
                                />
                            </LabeledInput>
                        </FormSection>
                        <FormSection>
                            <div className="center">
                                <Btn
                                    onClick={applyDamageToEntity(rpgCharacter, setRpgCharacter).bind(null, dmgPerAttack)}>
                                    Нанести урон
                                </Btn>
                            </div>
                        </FormSection>
                        <FormSection>
                            <div className="app__skills">
                                {
                                    Object.keys(rpgCharacter.skills).map((skillStat: string) => {
                                        const correctTypedSkillStat: EntityStatsKeys = skillStat as EntityStatsKeys;

                                        return (
                                            <div key={correctTypedSkillStat} className="app__skills-col">
                                                {
                                                    Object.keys(rpgCharacter.skills[correctTypedSkillStat]).map((skillKey: string) => {
                                                        const currentSkill: Skill = rpgCharacter.skills[correctTypedSkillStat][skillKey];

                                                        return (
                                                            <FormSection key={skillKey}>
                                                                <LabeledInput
                                                                    title={
                                                                        <div>
                                                                            <div>{currentSkill.name}</div>
                                                                            <div>({SkillLevelNamesEnum[currentSkill.level] || 'Запредельный'})</div>
                                                                        </div>
                                                                    }
                                                                    titleCenter={true}
                                                                >
                                                                    <ClickInput
                                                                        minValue={0}
                                                                        maxValue={rpgCharacter.baseStats[correctTypedSkillStat]}
                                                                        value={currentSkill.level}
                                                                        onChangeValue={changeSkillLevel(skillKey, correctTypedSkillStat, rpgCharacter, setRpgCharacter)}
                                                                    />
                                                                </LabeledInput>
                                                            </FormSection>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </FormSection>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
