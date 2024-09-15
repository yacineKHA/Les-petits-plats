export class Recipe {
    constructor(id, name, servings, ingredients, time, description, appliance, utensils, image) {
        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.utensils = utensils;
        this.image = image;
    }
}