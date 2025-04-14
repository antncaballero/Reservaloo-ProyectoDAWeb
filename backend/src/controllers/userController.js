import { User } from '../models/user.js';

export class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users from the database');
        }
    }
    
    static async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.getUserById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Error fetching user from the database');
        }
    }
}