"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin_edit_jobs_useCase = void 0;
const JobsEntities_1 = require("../../../entities/JobsEntities");
class Admin_edit_jobs_useCase {
    constructor(jobRepositories) {
        this.jobRepositories = jobRepositories;
    }
    execute(name, description, minimum_wage, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobRepositories.jobsFindbyId(id);
            if (!job)
                throw new Error("Job id Not matching ");
            job.name = name;
            job.description = description;
            job.minimum_wage = minimum_wage;
            const updatejob = yield this.jobRepositories.jobsFindbyIdAndUpdate(job);
            if (!updatejob)
                throw new Error("job Not Updated");
            return new JobsEntities_1.JobsEntities(updatejob.id, updatejob.name, updatejob.description, updatejob.minimum_wage);
        });
    }
}
exports.Admin_edit_jobs_useCase = Admin_edit_jobs_useCase;
