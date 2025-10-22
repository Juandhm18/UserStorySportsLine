"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Product = exports.User = void 0;
const user_model_1 = __importDefault(require("./models/user.model"));
exports.User = user_model_1.default;
const product_model_1 = __importDefault(require("./models/product.model"));
exports.Product = product_model_1.default;
const client_model_1 = __importDefault(require("./models/client.model"));
exports.Client = client_model_1.default;
//# sourceMappingURL=index.js.map