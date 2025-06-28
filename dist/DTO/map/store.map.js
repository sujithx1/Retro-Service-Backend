"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreMap = void 0;
class StoreMap {
    static toResponse(store) {
        return {
            id: store.id,
            name: store.name,
            owner_email: store.owner_email,
            owner_name: store.owner_name,
            owner_phone: store.owner_phone,
            location: store.location,
            profile_pic: store.profile_pic,
            isActive: store.isActive,
            storeId: store.storeId,
            createdAt: store.createdAt,
            updatedAt: store.updatedAt
        };
    }
}
exports.StoreMap = StoreMap;
