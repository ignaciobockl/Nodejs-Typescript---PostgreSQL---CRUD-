import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';


export const getUsers = async ( req: Request, res: Response ): Promise<Response> => {
    
    try {
        
        const response: QueryResult = await pool.query('SELECT * FROM users');
        console.log( response.rows );

        return res.status(200).json(response.rows);

    } catch (error) {

        console.log(error);
        return res.status(500).json('Internal Server Error');

    }

}

export const getUserById = async ( req: Request, res: Response ): Promise<Response> => {

    try {
        
        const id = parseInt( req.params.id );
        const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [ id ]);
        console.log(response.rows);

        if ( response.rows.length === 0 ) {
            console.log(`No existe usuario con el id: ${ id }`);
            return res.status(400).json(`No existe usuario con el id: ${ id }`);
        }

        return res.json( response.rows );

    } catch (error) {
        
        console.log(error);
        return res.status(500).json('Internal Server Error');

    }

}

export const createUser = async ( req: Request, res: Response): Promise<Response> => {

    const { name, email } = req.body;
    console.log(req.body);

    if ( name === undefined || email === undefined ) {
        return res.status(400).json('Name and Email is Required');
    }

    const response: QueryResult = await pool.query('INSERT INTO users ( name, email ) VALUES ( $1, $2 )', [ name, email ]);

    return res.status(201).json({
        message: 'User created successfully',
        body: {
            user: {
                name,
                email
            }
        }
    });

}

export const updateUser = async ( req: Request, res: Response ): Promise<Response> => {
    
    const id = parseInt( req.params.id );
    const { name, email } = req.body;

    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [ id ]);

    if ( response.rows.length === 0 ) {
        console.log(`No existe usuario con el id: ${ id }`);
        return res.status(400).json(`No existe usuario con el id: ${ id }`);
    }

    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [ name, email, id ]);

    return res.status(200).json(`User ${ name } con el id ${ id } fue modificado correctamente`);

}

export const deleteUserPhysical = async ( req: Request, res: Response ): Promise<Response> => {
    
    const id = parseInt( req.params.id );
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [ id ]);

    if ( response.rows.length === 0 ) {
        console.log(`No existe usuario con el id: ${ id }`);
        return res.status(400).json(`No existe usuario con el id: ${ id }`);
    }

    const r = response.rows;
    await pool.query('DELETE FROM users WHERE id = $1', [ id ]);

    return res.status(200).json({
        message: `El usuario ${ r[0].name } con el id ${ id } fue eliminado correctamente`
    });

}

// export const deleteUserLogical = async ( req: Request, res: Response ): Promise<Response> => {
//     return res.send('Hola');
// }