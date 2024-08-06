import { injectable } from "tsyringe";
import { User } from "../models/userModel";
import { CreationAttributes } from "sequelize";

@injectable()
export default class UserRepository{
    async findAll() {
        return await User.findAll()
    }

    async findById(id: number) {
        return await User.findByPk(id)
    }

    async findByEmail(email: string){
        return await User.findOne({where: {email}})
    }

    async create(user: { name: string, email: string, password: string, role: "admin"  | "client"}) {
        return await User.create(user)
    }

    async update(id: number, userData: Partial<CreationAttributes<User>>) {
        const [updatedCount, updatedUsers] = await User.update(userData, {
            where: { id },
            returning: true
        });
    
        if (updatedCount === 0) {
            return null; // Asegúrate de que el ID sea correcto y exista una tarea con ese ID.
        }
    
        return updatedUsers[0];
    }

    async delete(id: number) {
        const result = await User.destroy({
            where: { id }
        });
    
        return result > 0;
    }

    async login (email:string, password:string):Promise<boolean>{
        const user = await this.findByEmail(email);
        if (!user || !(await user.validatePassword(password))) {
            return false;
        }
        return true;
    }
}