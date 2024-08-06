import { 
    Table,
    PrimaryKey,
    ForeignKey,
    HasMany,
    BelongsTo,
    Model,
    Column,
    DataType,
    AutoIncrement,
} from "sequelize-typescript";
import { Cart } from "./cartModel";
import { Product } from "./productModel";
import { Order } from "./orderModel";

@Table({
    tableName: "productcarts",
    timestamps: true
})

export class ProductCart extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER
    })
    cartId!: number

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER
    })
    productiD!: number

    @Column({
        type: DataType.INTEGER
    })
    quantity!: number

    @HasMany(() => Product)
    product!: Product[]

    @BelongsTo (() => Cart)
    cart!: Cart

    @BelongsTo (() => Order)
    order!: Order

    @ForeignKey(()=> Order)
    orderid!: Order
}