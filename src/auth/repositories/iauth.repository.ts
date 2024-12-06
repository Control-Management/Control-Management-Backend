
import { User } from '../models/user.model';
import { UserRole } from '../models/user_role';
import { UserRoles } from '../models/user_roles';
export interface IAuthRepository{
    isUserExists(email: string, username: string) : Promise<boolean>
    createUser(user: User) : Promise<void>
    getRoleName(role: UserRoles): Promise<UserRole>
    findUserByEmail(email: string): Promise<User>
}