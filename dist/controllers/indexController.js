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
exports.deleteUserPhysical = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        console.log(response.rows);
        if (response.rows.length === 0) {
            console.log(`No existe usuario con el id: ${id}`);
            return res.status(400).json(`No existe usuario con el id: ${id}`);
        }
        return res.json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    console.log(req.body);
    if (name === undefined || email === undefined) {
        return res.status(400).json('Name and Email is Required');
    }
    const response = yield database_1.pool.query('INSERT INTO users ( name, email ) VALUES ( $1, $2 )', [name, email]);
    return res.status(201).json({
        message: 'User created successfully',
        body: {
            user: {
                name,
                email
            }
        }
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (response.rows.length === 0) {
        console.log(`No existe usuario con el id: ${id}`);
        return res.status(400).json(`No existe usuario con el id: ${id}`);
    }
    yield database_1.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    return res.status(200).json(`User ${name} con el id ${id} fue modificado correctamente`);
});
exports.updateUser = updateUser;
const deleteUserPhysical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (response.rows.length === 0) {
        console.log(`No existe usuario con el id: ${id}`);
        return res.status(400).json(`No existe usuario con el id: ${id}`);
    }
    const r = response.rows;
    yield database_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
    return res.status(200).json({
        message: `El usuario ${r[0].name} con el id ${id} fue eliminado correctamente`
    });
});
exports.deleteUserPhysical = deleteUserPhysical;
// export const deleteUserLogical = async ( req: Request, res: Response ): Promise<Response> => {
//     return res.send('Hola');
// }
