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
exports.Mongo_Job_admin_Repositories = void 0;
const JobsEntities_1 = require("../../../../entities/JobsEntities");
const JobsModal_1 = require("../../../../frameworks/db/models/JobsModal");
class Mongo_Job_admin_Repositories {
    jobsCreate(jobs) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield JobsModal_1.JobModel.create(jobs);
            return new JobsEntities_1.JobsEntities(job.id, job.name, job.description, job.minimum_wage);
        });
    }
    jobsFindbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield JobsModal_1.JobModel.findById(id);
            if (!job)
                return null;
            return new JobsEntities_1.JobsEntities(job.id, job.name, job.description, job.minimum_wage, job.isBlock);
        });
    }
    jobsFindbyName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield JobsModal_1.JobModel.findOne({ name });
            if (!job)
                return null;
            return new JobsEntities_1.JobsEntities(job.id, job.name, job.description, job.minimum_wage, job.isBlock);
        });
    }
    jobsFindbyIdAndUpdate(jobs) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield JobsModal_1.JobModel.findByIdAndUpdate(jobs.id, {
                name: jobs.name,
                description: jobs.description,
                minimum_wage: jobs.minimum_wage,
                isBlock: jobs.isBlock
            }, { new: true });
            if (!job)
                return null;
            return new JobsEntities_1.JobsEntities(job.id, job.name, job.description, job.minimum_wage, job.isBlock);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield JobsModal_1.JobModel.find();
            console.log(jobs);
            return jobs.map((item) => new JobsEntities_1.JobsEntities(item.id, item.name, item.description, item.minimum_wage, item.isBlock, item.image));
        });
    }
}
exports.Mongo_Job_admin_Repositories = Mongo_Job_admin_Repositories;
