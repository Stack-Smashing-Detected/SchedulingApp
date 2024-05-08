import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Action } from '../schemas/Actions.schema';
import { CreateActionDto } from './dto/CreateAction.dto'

export interface ActionDocument extends Action, Document { }

@Injectable()
export class ActionsService {
    constructor(@InjectModel(Action.name) private actionModel: Model<ActionDocument>) { }

    // find all the stored actions.
    async findAll(): Promise<Action[]> {
        return this.actionModel.find().exec();
    }

    // find an action by its mongo id. 
    async findById(id: string): Promise<ActionDocument | null> {
        return this.actionModel.findOne({ id }).lean();
    }

    // find an action by its name (stored as actionName in )
    async findByActionName(actionName: string): Promise<ActionDocument | null> {
        return this.actionModel.findOne({ actionName }).lean();
    }

    // create action
    async createAction(createActionDto: CreateActionDto): Promise<ActionDocument> {
        const newAction = new this.actionModel({ createActionDto });

        return newAction.save();
    }

    async updateAction(){

    }
    
    // delete an action resource
    async deleteAction(id: string): Promise<ActionDocument> {
        return this.actionModel.findByIdAndDelete(id);
    }

    }
}
