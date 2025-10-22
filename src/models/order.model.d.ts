import { Model } from 'sequelize';
declare class Order extends Model {
    id: number;
    clientId: number;
    userId: number;
    total: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'delivered';
    notes?: string;
}
export default Order;
//# sourceMappingURL=order.model.d.ts.map