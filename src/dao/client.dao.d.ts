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
declare class ClientDAO {
    create(clientData: CreateClientData): Promise<Client>;
    findById(id: number): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    findByDocument(document: string): Promise<Client | null>;
    findAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<{
        clients: Client[];
        total: number;
    }>;
    update(id: number, clientData: UpdateClientData): Promise<number>;
    delete(id: number): Promise<number>;
    existsByEmail(email: string, excludeId?: number): Promise<boolean>;
    existsByDocument(document: string, excludeId?: number): Promise<boolean>;
    getClientsWithOrders(): Promise<Client[]>;
    getTopClients(limit?: number): Promise<Client[]>;
    toResponseDTO(client: Client): ClientResponseDTO;
    toResponseDTOArray(clients: Client[]): ClientResponseDTO[];
}
declare const _default: ClientDAO;
export default _default;
//# sourceMappingURL=client.dao.d.ts.map