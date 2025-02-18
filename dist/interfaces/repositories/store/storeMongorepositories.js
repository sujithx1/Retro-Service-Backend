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
exports.StoreMongoRepositories = void 0;
const StoreEntities_1 = require("../../../entities/StoreEntities");
const Storemodel_1 = require("../../../frameworks/db/models/Storemodel");
const returnstore = (store) => {
    return new StoreEntities_1.StoreEntities(store.id, store.name, store.owner_name, store.owner_email, store.owner_phone, store.isActive, store.password, store.storeId, store.profile_pic, store.location, store.createdAt, store.updatedAt);
};
class StoreMongoRepositories {
    findByowner_email(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield Storemodel_1.StoreModel.findOne({ owner_email: email });
            if (!store)
                return null;
            return returnstore(store);
        });
    }
    findbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield Storemodel_1.StoreModel.findById(id);
            if (!store)
                return null;
            return returnstore(store);
        });
    }
    create(storeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield Storemodel_1.StoreModel.create(storeData);
            return returnstore(store);
        });
    }
}
exports.StoreMongoRepositories = StoreMongoRepositories;
