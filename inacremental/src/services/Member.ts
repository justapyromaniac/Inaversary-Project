import {Generator} from './Generator';
import {Upgrade} from './Upgrade';

export interface Member {
    name: string,
    generators: Generator[],
    upgrades: Upgrade[]
}