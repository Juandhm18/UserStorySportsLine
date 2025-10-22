import Client from '../models/client.model';
import { ClientResponseDTO } from '../dto/client.dto';

export interface CreateClientData {
    name: string;
    email: string;
    phone?: string | undefined;
    address?: string | undefined;
    document: string;
}

export interface UpdateClientData {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    document?: string | undefined;
}

class ClientDAO {
    async create(clientData: CreateClientData): Promise<Client> {
        return await Client.create(clientData as any);
    }

    async findById(id: number): Promise<Client | null> {
        return await Client.findByPk(id);
    }

    async findByEmail(email: string): Promise<Client | null> {
        return await Client.findOne({ where: { email } });
    }

    async findByDocument(document: string): Promise<Client | null> {
        return await Client.findOne({ where: { document } });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{ clients: Client[]; total: number }> {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'DESC' } = options || {};
        
        const offset = (page - 1) * limit;
        
        let whereClause: any = {};
        
        if (search) {
            whereClause = {
                [require('sequelize').Op.or]: [
                    { name: { [require('sequelize').Op.iLike]: `%${search}%` } },
                    { email: { [require('sequelize').Op.iLike]: `%${search}%` } },
                    { document: { [require('sequelize').Op.iLike]: `%${search}%` } }
                ]
            };
        }

        const { count, rows } = await Client.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [[sortBy, sortOrder]]
        });

        return {
            clients: rows,
            total: count
        };
    }

    async update(id: number, clientData: UpdateClientData): Promise<number> {
        const [affectedCount] = await Client.update(clientData, { where: { id } });
        return affectedCount;
    }

    async delete(id: number): Promise<number> {
        return await Client.destroy({ where: { id } });
    }

    async existsByEmail(email: string, excludeId?: number): Promise<boolean> {
        const whereClause: any = { email };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        
        const client = await Client.findOne({ where: whereClause });
        return client !== null;
    }

    async existsByDocument(document: string, excludeId?: number): Promise<boolean> {
        const whereClause: any = { document };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        
        const client = await Client.findOne({ where: whereClause });
        return client !== null;
    }

    async getClientsWithOrders(): Promise<Client[]> {
        // Este método se implementará cuando tengamos el modelo de pedidos
        return await Client.findAll({
            order: [['name', 'ASC']]
        });
    }

    async getTopClients(limit: number = 10): Promise<Client[]> {
        // Este método se implementará cuando tengamos el modelo de pedidos
        return await Client.findAll({
            limit,
            order: [['createdAt', 'DESC']]
        });
    }

    // Método para convertir Client a ClientResponseDTO
    toResponseDTO(client: Client): ClientResponseDTO {
        return {
            id: (client as any).id,
            name: (client as any).name,
            email: (client as any).email,
            phone: (client as any).phone,
            address: (client as any).address,
            document: (client as any).document,
            createdAt: (client as any).createdAt,
            updatedAt: (client as any).updatedAt
        };
    }

    // Método para convertir array de Clients a ClientResponseDTOs
    toResponseDTOArray(clients: Client[]): ClientResponseDTO[] {
        return clients.map(client => this.toResponseDTO(client));
    }
}

export default new ClientDAO();
