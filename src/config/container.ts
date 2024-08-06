import { container } from "tsyringe";
import {UserService, OrderService, ProductService, ProductCartService} from "../controllers/index"
import {UserRepository, OrderRepository, ProductRepository, ProductCartRepository} from "../repositories/index"

container.registerSingleton<UserService>(UserService);
container.registerSingleton<UserRepository>(UserRepository);

container.registerSingleton<OrderRepository>(OrderRepository);
container.registerSingleton<OrderService>(OrderService)

container.registerSingleton<ProductService>(ProductService);
container.registerSingleton<ProductRepository>(ProductRepository);

container.registerSingleton<ProductCartService>(ProductCartService);
container.registerSingleton<ProductCartRepository>(ProductCartRepository);