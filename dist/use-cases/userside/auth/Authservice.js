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
exports.User_Google_Auth_useCase = void 0;
const google_auth_library_1 = require("google-auth-library");
const Userentities_1 = require("../../../entities/Userentities");
const client = new google_auth_library_1.OAuth2Client(process.env.google_Client_ID);
class User_Google_Auth_useCase {
    constructor(userrepositories) {
        this.userrepositories = userrepositories;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.google_Client_ID
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email)
                throw new Error("no payload");
            let user = yield this.userrepositories.findByemail(payload.email);
            if (!user) {
                const userData = new Userentities_1.UserIntities("", payload.name, payload.email, "", "", true, payload.picture, false, "google");
                user = yield this.userrepositories.save(userData);
            }
            return user;
        });
    }
}
exports.User_Google_Auth_useCase = User_Google_Auth_useCase;
