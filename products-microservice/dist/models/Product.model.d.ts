import { Recipe } from './Recipe.model';
export declare class Product {
    id: number;
    name: string;
    description: string;
    sale_price: number;
    recipes: Recipe[];
}
