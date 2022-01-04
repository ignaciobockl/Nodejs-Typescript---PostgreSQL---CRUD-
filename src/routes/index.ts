import { Router } from 'express';
import { 
    getUserById, 
    getUsers, 
    createUser, 
    deleteUserPhysical, 
    updateUser } from '../controllers/indexController';

const router = Router();

// router.get('/test', (req, res) => res.send('Ciudadela es una fiesta...'));
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', createUser );
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUserPhysical);
// router.delete('/userl/:id', deleteUserLogical);

export default router;