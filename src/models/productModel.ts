
import{
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Table,
    DataType,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
import { ProductCart } from "./productCart";
import { Cart } from "./cartModel";

@Table({
    tableName: "products",
    timestamps: true
})

export class Product extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Column({
        type: DataType.DECIMAL
    })
    price!: number

    @Column({
        type: DataType.STRING
    })
    description!: string

    @Column({
        type: DataType.INTEGER
    })
    stock!: number

    @ForeignKey(()=> Cart)
    cartid!: Cart

    @ForeignKey(()=> ProductCart)
    productCartid!: ProductCart

    @BelongsTo(() => ProductCart)
    productCart!: ProductCart
}
