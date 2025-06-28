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
exports.User_Put_Image_UseCase = void 0;
const user_map_1 = require("../../../DTO/map/user.map");
class User_Put_Image_UseCase {
    constructor(userrrpositorise) {
        this.userrrpositorise = userrrpositorise;
    }
    execute(id, profile_pic) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userrrpositorise.findById(id);
            if (!user)
                throw new Error("User not found by Id");
            if (profile_pic) {
                user.profilePic = profile_pic;
            }
            const update = yield this.userrrpositorise.findByIdAndUpdate(user);
            if (!update)
                throw new Error("not updated");
            return user_map_1.UserMap.toResponse(update);
        });
    }
}
exports.User_Put_Image_UseCase = User_Put_Image_UseCase;
