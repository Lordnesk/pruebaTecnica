import UserRepository from "../repositories/userRepository";
import { CreationAttributes } from 'sequelize';
import { injectable, inject } from "tsyringe";
import { User } from "../models/userModel";
import  Jwt  from "jsonwebtoken";

@injectable()
export default class UserService {
    constructor (@inject(UserRepository) private userRepository: UserRepository){}

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id: number) {
        if (isNaN(id)) {
            throw new Error("Invalid user ID")
        }
        return await this.userRepository.findById(id)
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    async createUser(userData: { name: string, email: string, password: string, rol: "admin" | "client"}) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.rol = userData.rol;
        await user.setPassword(userData.password)

        return await user.save();
    }

    async updateUser(id: number, userData: Partial<CreationAttributes<User>>) {
        const existingUser = await this.userRepository.findById(id);
    
        if (!existingUser) {
            return  console.log(`User with ID ${id} not found in repository`);
        }
    
        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete(id);
        return result;
    }

    async login(email: string, password:string){
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await user.validatePassword(password))){
            throw new Error("Invalid Credentials")
        }
        const token = Jwt.sign(
            { id: user.id, role: user.rol},
            "secret",
            {expiresIn: "1h"}
        );
        return {token}
    }
}