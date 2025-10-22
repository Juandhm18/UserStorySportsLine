import ClientDAO, { CreateClientData, UpdateClientData } from '../dao/client.dao';
import { ClientResponseDTO, ClientListResponseDTO } from '../dto/client.dto';

class ClientService {
    async getAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<ClientListResponseDTO> {
        const { page = 1, limit = 10 } = options || {};
        
        const result = await ClientDAO.findAll(options);
        
        return {
            clients: ClientDAO.toResponseDTOArray(result.clients),
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            }
        };
    }

    async getById(id: number): Promise<ClientResponseDTO | null> {
        const client = await ClientDAO.findById(id);
        return client ? ClientDAO.toResponseDTO(client) : null;
    }

    async create(data: CreateClientData): Promise<ClientResponseDTO> {
        // Verificar si el email ya existe
        const emailExists = await ClientDAO.existsByEmail(data.email);
        if (emailExists) {
            throw new Error('El email del cliente debe ser único');
        }

        // Verificar si el documento ya existe
        const documentExists = await ClientDAO.existsByDocument(data.document);
        if (documentExists) {
            throw new Error('El documento del cliente debe ser único');
        }

        const client = await ClientDAO.create(data);
        return ClientDAO.toResponseDTO(client);
    }

    async update(id: number, data: UpdateClientData): Promise<ClientResponseDTO | null> {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const emailExists = await ClientDAO.existsByEmail(data.email, id);
            if (emailExists) {
                throw new Error('El email del cliente debe ser único');
            }
        }

        // Si se está actualizando el documento, verificar que no exista
        if (data.document) {
            const documentExists = await ClientDAO.existsByDocument(data.document, id);
            if (documentExists) {
                throw new Error('El documento del cliente debe ser único');
            }
        }

        const affectedCount = await ClientDAO.update(id, data);
        
        if (affectedCount === 0) {
            return null;
        }

        const updatedClient = await ClientDAO.findById(id);
        return updatedClient ? ClientDAO.toResponseDTO(updatedClient) : null;
    }

    async delete(id: number): Promise<boolean> {
        const deletedCount = await ClientDAO.delete(id);
        return deletedCount > 0;
    }

    async findByEmail(email: string): Promise<ClientResponseDTO | null> {
        const client = await ClientDAO.findByEmail(email);
        return client ? ClientDAO.toResponseDTO(client) : null;
    }

    async findByDocument(document: string): Promise<ClientResponseDTO | null> {
        const client = await ClientDAO.findByDocument(document);
        return client ? ClientDAO.toResponseDTO(client) : null;
    }

    async getClientsWithOrders(): Promise<ClientResponseDTO[]> {
        const clients = await ClientDAO.getClientsWithOrders();
        return ClientDAO.toResponseDTOArray(clients);
    }

    async getTopClients(limit: number = 10): Promise<ClientResponseDTO[]> {
        const clients = await ClientDAO.getTopClients(limit);
        return ClientDAO.toResponseDTOArray(clients);
    }
}

export default new ClientService();