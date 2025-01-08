"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsEntities = void 0;
class JobsEntities {
    constructor(id, name, description, minimum_wage, isBlock = false, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.minimum_wage = minimum_wage;
        this.isBlock = isBlock;
        this.image = image;
    }
}
exports.JobsEntities = JobsEntities;
