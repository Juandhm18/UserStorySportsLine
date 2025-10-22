import { Request, Response } from 'express';
import ClientService from '../services/client.service';
import { CreateClientDTOType, UpdateClientDTOType, ClientParamsDTOType, ClientQueryDTOType } from '../dto/client.dto';

class ClientController {
    async getAll(req: Request, res: Response) {
        try {
            const clients = await ClientService.getAll();
            
            res.status(200).json({
                success: true,
                message: 'Clientes obtenidos exitosamente',
                data: clients
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener clientes: ' + error.message
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ClientParamsDTOType;
            const client = await ClientService.getById(id);

            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Cliente obtenido exitosamente',
                data: client
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener cliente: ' + error.message
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const clientData = req.body as CreateClientDTOType;
            const client = await ClientService.create(clientData);

            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente',
                data: client
            });
        } catch (error: any) {
            if (error.message.includes('email único') || error.message.includes('documento único')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al crear cliente: ' + error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ClientParamsDTOType;
            const clientData = req.body as UpdateClientDTOType;
            
            const client = await ClientService.update(id, clientData);

            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Cliente actualizado exitosamente',
                data: client
            });
        } catch (error: any) {
            if (error.message.includes('email único') || error.message.includes('documento único')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Error al actualizar cliente: ' + error.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as ClientParamsDTOType;
            const deleted = await ClientService.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Cliente eliminado exitosamente'
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar cliente: ' + error.message
            });
        }
    }
}

export default new ClientController();
