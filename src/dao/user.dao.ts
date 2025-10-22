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

class UserDAO {
    async create(userData: CreateUserData): Promise<User> {
        return await User.create(userData as any);
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async update(id: number, userData: UpdateUserData): Promise<number> {
        const [affectedCount] = await User.update(userData, { where: { id } });
        return affectedCount;
    }

    async delete(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } });
        return user !== null;
    }

    // Método para convertir User a UserResponseDTO
    toResponseDTO(user: User): UserResponseDTO {
        return {
            id: (user as any).id,
            name: (user as any).name,
            email: (user as any).email,
            rol: (user as any).rol,
            createdAt: (user as any).createdAt,
            updatedAt: (user as any).updatedAt
        };
    }

    // Método para convertir array de Users a UserResponseDTOs
    toResponseDTOArray(users: User[]): UserResponseDTO[] {
        return users.map(user => this.toResponseDTO(user));
    }
}

export default new UserDAO();
