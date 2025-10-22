import User from '../models/user.model';
import { UserResponseDTO } from '../dto/auth.dto';
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    rol: 'admin' | 'vendedor';
}
export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
    rol?: 'admin' | 'vendedor';
}
declare class UserDAO {
    create(userData: CreateUserData): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, userData: UpdateUserData): Promise<number>;
    delete(id: number): Promise<number>;
    existsByEmail(email: string): Promise<boolean>;
    toResponseDTO(user: User): UserResponseDTO;
    toResponseDTOArray(users: User[]): UserResponseDTO[];
}
declare const _default: UserDAO;
export default _default;
//# sourceMappingURL=user.dao.d.ts.map