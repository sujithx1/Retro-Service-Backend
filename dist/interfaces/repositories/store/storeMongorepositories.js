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
    return new StoreEntities_1.StoreEntities(store._id.toString(), store.name, store.owner_name, store.owner_email, store.owner_phone, store.isActive, store.password, store.storeId, store.profile_pic, store.location, store.createdAt, store.updatedAt);
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
    findbystoreId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield Storemodel_1.StoreModel.findOne({ storeId: id });
            if (!store)
                return null;
            return returnstore(store);
        });
    }
    findandlocationAndupdate(id, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeData = yield Storemodel_1.StoreModel.findByIdAndUpdate(id, {
                location: location
            }, { new: true, upsert: true });
            if (!storeData)
                return null;
            return returnstore(storeData);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield Storemodel_1.StoreModel.find();
            return stores.map((res) => returnstore(res));
        });
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        return __awaiter(this, void 0, void 0, function* () {
            const toRad = (value) => (value * Math.PI) / 180;
            const R = 6371; // Radius of Earth in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        });
    }
    ;
    find20Km(location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find stores that are active and have a valid location
                const stores = yield Storemodel_1.StoreModel.find({
                    isActive: true,
                    'location.lat': { $exists: true },
                    'location.lng': { $exists: true },
                });
                // Map stores to include calculated distances
                const storesWithDistances = yield Promise.all(stores.map((store) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const distance = ((_a = store.location) === null || _a === void 0 ? void 0 : _a.lat) && ((_b = store.location) === null || _b === void 0 ? void 0 : _b.lng)
                        ? yield this.calculateDistance(location.lat, location.lng, store.location.lat, store.location.lng)
                        : Infinity; // If location is missing, set to Infinity
                    return { store, distance };
                })));
                // Filter stores within 20 km radius
                const nearbyStores = storesWithDistances
                    .filter((item) => item.distance <= 20)
                    .map((item) => returnstore(item.store)); // Extract `store` before passing
                return nearbyStores;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.StoreMongoRepositories = StoreMongoRepositories;
