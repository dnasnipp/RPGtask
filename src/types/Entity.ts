import {Skill} from "./Skill";

export type EntityStatsKeys = 'strength' | 'agility' | 'mind' | 'charisma';

export type BaseEntityStats = {
    [statKey in EntityStatsKeys]: number;
}

export type EntitySkills = {
    [statKey in EntityStatsKeys]: {
        [skillName: string]: Skill;
    }
}

export interface Entity {
    name: string;
    baseStats: BaseEntityStats;
    skills: EntitySkills;
    currentHealth: number;
    maxHealth: number;
}