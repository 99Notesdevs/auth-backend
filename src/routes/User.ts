import { Router } from 'express';
import { User } from '../controllers/user';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';

const userRouter = Router();

userRouter.get('/', authenticate, authorizeRoles(["User"]), User.userDetails);
userRouter.get('/check', authenticate, authorizeRoles(["User"]), User.check); //simple user check for auth token
userRouter.get('/validate', authenticate, authorizeRoles(["User"]), User.validate);
userRouter.get('/:id', authenticate, authorizeRoles(["Admin"]), User.adminUserDetails);

userRouter.post('/signup', User.register);
userRouter.post('/', User.login);
userRouter.post('/google', User.googleOneTapLogin);
userRouter.post('/logout', authenticate, authorizeRoles(["User"]), User.logout);

userRouter.put('/updateUser/:id', authenticate, authorizeRoles(["Admin"]), User.adminUpdateUser);
userRouter.put('/userdata', authenticate, authorizeRoles(["User"]), User.updateUserData);
userRouter.put('/:id', authenticate, authorizeRoles(["User"]), User.userUpdate);
// userRouter.delete('/:id', authenticate, authorizeRoles(["User"]), User.deleteUser);

export default userRouter;