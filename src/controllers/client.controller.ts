import { Request, Response } from 'express';
import ClientService from '../services/client.service';
import { CreateClientDTOType, UpdateClientDTOType, ClientParamsDTOType, ClientQueryDTOType } from '../dto/client.dto';
import { ResponseUtil } from '../utils/response.util';
import { MESSAGES } from '../constants/messages';

class ClientController {
    async getAll(req: Request, res: Response) {
        try {
            const clients = await ClientService.getAll();
            
            ResponseUtil.success(res, MESSAGES.SUCCESS.CLIENTS_RETRIEVED, clients);
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error al obtener clientes: ${error.message}`);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ClientParamsDTOType;
            const client = await ClientService.getById(id);

            if (!client) {
                return ResponseUtil.notFound(res, MESSAGES.ERROR.CLIENT_NOT_FOUND);
            }

            ResponseUtil.success(res, MESSAGES.SUCCESS.CLIENT_RETRIEVED, client);
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error al obtener cliente: ${error.message}`);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const clientData = req.body as CreateClientDTOType;
            const client = await ClientService.create(clientData);

            ResponseUtil.created(res, MESSAGES.SUCCESS.CLIENT_CREATED, client);
        } catch (error: any) {
            if (error.message.includes('email único') || error.message.includes('documento único')) {
                return ResponseUtil.error(res, error.message, 400);
            }

            ResponseUtil.internalError(res, `Error al crear cliente: ${error.message}`);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ClientParamsDTOType;
            const clientData = req.body as UpdateClientDTOType;
            
            const client = await ClientService.update(id, clientData);

            if (!client) {
                return ResponseUtil.notFound(res, MESSAGES.ERROR.CLIENT_NOT_FOUND);
            }

            ResponseUtil.success(res, MESSAGES.SUCCESS.CLIENT_UPDATED, client);
        } catch (error: any) {
            if (error.message.includes('email único') || error.message.includes('documento único')) {
                return ResponseUtil.error(res, error.message, 400);
            }

            ResponseUtil.internalError(res, `Error al actualizar cliente: ${error.message}`);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ClientParamsDTOType;
            const deleted = await ClientService.delete(id);

            if (!deleted) {
                return ResponseUtil.notFound(res, MESSAGES.ERROR.CLIENT_NOT_FOUND);
            }

            ResponseUtil.success(res, MESSAGES.SUCCESS.CLIENT_DELETED);
        } catch (error: any) {
            ResponseUtil.internalError(res, `Error al eliminar cliente: ${error.message}`);
        }
    }
}

export default new ClientController();
