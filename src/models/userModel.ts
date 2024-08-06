
import{
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    AutoIncrement,
    HasMany,
    HasOne,
    Table,
    DataType,
} from "sequelize-typescript";
import bycrypt from "bcrypt";
import { Entities } from "./entitiesModel";
import { Cart } from "./cartModel";
import { Order } from "./orderModel";
import { Rol } from "./rolModel";

@Table({
    tableName: "users",
    timestamps: true
})

export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING
    })
    name!: string

    @Column({
        type: DataType.STRING
    })
    email!: string;

    @Column({
        type: DataType.STRING
    })
    password!: string;

    @ForeignKey(() => Entities)
    @Column({
        type: DataType.INTEGER
    })
    entitiesId!: number;

    @HasOne(() => Entities)
    entitie!: Entities;

    @HasOne(() => Cart)
    cart!: Cart;

    @Column({
        type: DataType.STRING
    })
    rol!: string

    @HasMany(() => Order)
    order!: Order[]

    async setPassword(password: string) {
        const hashPassword= await bycrypt.hash(password, 10);
        this.password = hashPassword;
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bycrypt.compare(password, this.password)
    }
}

