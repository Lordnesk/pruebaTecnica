import{
    Table,
    Column,
    BelongsTo,
    PrimaryKey,
    DataType,
    Model,
    ForeignKey
} from "sequelize-typescript"
import { User } from "./userModel";

@Table({
    tableName: "roles",
    timestamps: false
})

export class Entities extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @ForeignKey(()=> User)
    userid!: User

    @BelongsTo(() => User)
    user!: User;
}