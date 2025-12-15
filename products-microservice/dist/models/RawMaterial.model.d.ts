import { Recipe } from './Recipe.model';
export declare class RawMaterial {
    id: number;
    name: string;
    unit_cost: number;
    recipes: Recipe[];
}
