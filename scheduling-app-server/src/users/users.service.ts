import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

export type UserDocument = User & Document;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ id }).exec();
    }

    // find by username for verifying login. 
    async findByUsername(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ username }).exec()
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    };

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> | null {
        return this.userModel.findByIdAndUpdate(id, updateUserDto);
    }

    async deleteUser(id: string): Promise<UserDocument> | null {
        return this.userModel.findByIdAndDelete(id);
    }
}