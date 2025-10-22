import { CreateClientData, UpdateClientData } from '../dao/client.dao';
import { ClientResponseDTO, ClientListResponseDTO } from '../dto/client.dto';
declare class ClientService {
    getAll(options?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<ClientListResponseDTO>;
    getById(id: number): Promise<ClientResponseDTO | null>;
    create(data: CreateClientData): Promise<ClientResponseDTO>;
    update(id: number, data: UpdateClientData): Promise<ClientResponseDTO | null>;
    delete(id: number): Promise<boolean>;
    findByEmail(email: string): Promise<ClientResponseDTO | null>;
    findByDocument(document: string): Promise<ClientResponseDTO | null>;
    getClientsWithOrders(): Promise<ClientResponseDTO[]>;
    getTopClients(limit?: number): Promise<ClientResponseDTO[]>;
}
declare const _default: ClientService;
export default _default;
//# sourceMappingURL=client.service.d.ts.map