import { 
    Table,
    PrimaryKey,
    ForeignKey,
    Column,
    BelongsTo,
    HasMany,
    Model,
    DataType,
    AutoIncrement
} from "sequelize-typescript";
import { User } from "./userModel";
import { ProductCart } from "./productCart";

@Table({
    tableName: "orders",
    timestamps: true
})

export class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId!: number

    @ForeignKey(() => ProductCart)
    @Column({
        type: DataType.INTEGER
    })
    productCartId!: number

    @Column({
        type: DataType.DECIMAL
    })
    total!: number

    @BelongsTo(() => User)
    user!: User

    @HasMany(() => ProductCart)
    productCart!: ProductCart[]
}