"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(index_1.default);
app.listen(4000, () => {
    console.log('Server on port', 4000);
});
// https://www.youtube.com/watch?v=z4BNZfZ1Wq8&list=PLo5lAe9kQrwo-ILxlSGaFhF768hhPbrFB&index=8
