import Client from '../models/client.model';

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

export interface ClientResponse {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    document: string;
    createdAt: Date;
    updatedAt: Date;
}

class ClientService {
    async getAll(): Promise<ClientResponse[]> {
        const clients = await Client.findAll();
        return clients.map(client => this.toResponseDTO(client));
    }

    async getById(id: number): Promise<ClientResponse | null> {
        const client = await Client.findByPk(id);
        return client ? this.toResponseDTO(client) : null;
    }

    async create(data: CreateClientData): Promise<ClientResponse> {
        // Verificar si el email ya existe
        const existingEmail = await Client.findOne({ where: { email: data.email } });
        if (existingEmail) {
            throw new Error('El email del cliente debe ser único');
        }

        // Verificar si el documento ya existe
        const existingDocument = await Client.findOne({ where: { document: data.document } });
        if (existingDocument) {
            throw new Error('El documento del cliente debe ser único');
        }

        const client = await Client.create(data as any);
        return this.toResponseDTO(client);
    }

    async update(id: number, data: UpdateClientData): Promise<ClientResponse | null> {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const existingEmail = await Client.findOne({ 
                where: { 
                    email: data.email,
                    id: { [require('sequelize').Op.ne]: id }
                } 
            });
            if (existingEmail) {
                throw new Error('El email del cliente debe ser único');
            }
        }

        // Si se está actualizando el documento, verificar que no exista
        if (data.document) {
            const existingDocument = await Client.findOne({ 
                where: { 
                    document: data.document,
                    id: { [require('sequelize').Op.ne]: id }
                } 
            });
            if (existingDocument) {
                throw new Error('El documento del cliente debe ser único');
            }
        }

        const [affectedCount] = await Client.update(data, { where: { id } });
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedClient = await Client.findByPk(id);
        return updatedClient ? this.toResponseDTO(updatedClient) : null;
    }

    async delete(id: number): Promise<boolean> {
        const deletedCount = await Client.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async findByEmail(email: string): Promise<ClientResponse | null> {
        const client = await Client.findOne({ where: { email } });
        return client ? this.toResponseDTO(client) : null;
    }

    async findByDocument(document: string): Promise<ClientResponse | null> {
        const client = await Client.findOne({ where: { document } });
        return client ? this.toResponseDTO(client) : null;
    }

    // Método para convertir Client a ClientResponse
    private toResponseDTO(client: Client): ClientResponse {
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
}

export default new ClientService();
