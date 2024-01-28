import { Request, Response } from 'express';
import { container } from 'tsyringe';
import OrderCreateUseCase from '../../domain/use-cases/Order/OrderCreateUseCase';
import OrderListUseCase from '../../domain/use-cases/Order/OrderListUseCase';
import OrderListByStatusUseCase from '../../domain/use-cases/Order/OrderListByStatusUseCase';
import OrderFindOneUseCase from '../../domain/use-cases/Order/OrderFindOneUseCase';
import OrderUpdateStatusUseCase from '../../domain/use-cases/Order/OrderUpdateStatusUseCase';
import { OrderStatus } from '../../domain/entities/Order';
import OrderDeleteUseCase from '../../domain/use-cases/Order/OrderDeleteUseCase';

export default class OrderController {
	async create(request: Request, response: Response) {
		const createOrderUseCase = container.resolve(OrderCreateUseCase);
		try {
			await createOrderUseCase.execute(request.body);

			return response.status(201).json({ message: 'Order created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const listOrderUseCase = container.resolve(OrderListUseCase);
		try {
			const orders = await listOrderUseCase.execute();

			return response.status(200).json(orders);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async listByStatus(reques: Request, response: Response) {
		const listOrderByStatusUseCase = container.resolve(OrderListByStatusUseCase);
		try {
			const orders = await listOrderByStatusUseCase.execute();

			return response.status(200).json(orders);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {

		const findOneOrderUseCase = container.resolve(OrderFindOneUseCase);
		try {
			const order = await findOneOrderUseCase.execute(request.params.id);

			return response.status(200).json(order);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async changeOrderStatus(request: Request, response: Response) {

		const findOneOrderUseCase = container.resolve(OrderUpdateStatusUseCase);
		try {
			await findOneOrderUseCase.execute({id: request.params.id, status: request.body.status});

			return response.status(200).json({ message: 'Order updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {

		const deleteOrderUseCase = container.resolve(OrderDeleteUseCase);
		try {
			await deleteOrderUseCase.execute(request.params.id);

			return response.status(200).json({ message: 'Order deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

}
