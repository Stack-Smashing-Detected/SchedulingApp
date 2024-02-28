import {
    Body, Controller, Post, Get, UsePipes, ValidationPipe,
    Param, Patch, HttpException, Delete
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { User } from "src/schemas/User.schema";
import mongoose from "mongoose";


@Controller('users')
export class UsersController {
    /**
     * GET /users
     * GET /users/:name
     * POST /users
     * DELETE /users/:name
     */

    constructor(private usersService: UsersService) { }

    @Get() // GET /users
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id') // GET /users/username
    async findById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Unable to find user with this id', 404);
        const findUser = await this.usersService.findById(id);
        if (!findUser) throw new HttpException('Unable to find user with this id', 404);
        return findUser;
    }

    @Post() //POST /users
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id') //PATCH /users/username
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Unable to find user with this specified id', 404);
        const updatedUser = this.usersService.updateUser(id, updateUserDto);

        if (!updatedUser) throw new HttpException('Unable to find user with this specified id', 404);
        return updatedUser;
    }

    @Delete(':id') //DELETE /users/username
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Unable to finder user with this specified id', 404);
        const deletedUser = await this.usersService.deleteUser(id);

        if (!deletedUser) throw new HttpException('The targeted item is not a User object', 404);
        console.log(deletedUser);
    }

}