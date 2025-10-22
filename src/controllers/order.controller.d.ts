import { Request, Response } from 'express';
declare class OrderController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getOrdersByClient(req: Request, res: Response): Promise<void>;
    getOrdersByProduct(req: Request, res: Response): Promise<void>;
    cancelOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    confirmOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deliverOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getOrdersByStatus(req: Request, res: Response): Promise<void>;
    getOrderHistory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getOrderStatistics(req: Request, res: Response): Promise<void>;
    private calculateTopProducts;
    testOrderEncryption(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: OrderController;
export default _default;
//# sourceMappingURL=order.controller.d.ts.map