import { 
    Table,
    Column,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    Model,
    DataType,
    HasMany,
    AutoIncrement
} from "sequelize-typescript";
import { User } from "./userModel";
import { ProductCart } from "./productCart";
import { Product } from "./productModel";

@Table({
    tableName: "carts",
    timestamps: true
})

export class Cart extends Model {
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

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Product)
    productCart!: Product[]
}