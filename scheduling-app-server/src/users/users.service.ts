import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import bcrypt from 'bcrypt';


export interface UserDocument extends User, Document { }

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ id }).lean();
    }

    // find by username for verifying login. 
    async findByUsername(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ username }).lean();
    }

    // uses bcrypt hashing on new user password.
    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);

        const newUser = new this.userModel({
            ...CreateUserDto,
            password: hash,
        })
        return newUser.save();
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> | null {
        return this.userModel.findByIdAndUpdate(id, updateUserDto);
    }

    async deleteUser(id: string): Promise<UserDocument> | null {
        return this.userModel.findByIdAndDelete(id);
    }
}