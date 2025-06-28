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
exports.Admin_del_job_useCase = void 0;
const JobsEntities_1 = require("../../../entities/JobsEntities");
class Admin_del_job_useCase {
    constructor(jobrepositories) {
        this.jobrepositories = jobrepositories;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobrepositories.jobsFindbyId(id);
            if (!job)
                throw new Error("Id Not Matching");
            job.isBlock = !job.isBlock;
            const update = yield this.jobrepositories.jobsFindbyIdAndUpdate(job);
            if (!update)
                throw new Error("not Updated");
            return new JobsEntities_1.JobsEntities(update.id, update.name, update.description, update.minimum_wage, update.isBlock);
        });
    }
}
exports.Admin_del_job_useCase = Admin_del_job_useCase;
