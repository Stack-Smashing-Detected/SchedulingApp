import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from '../schemas/Actions.schema';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Action.name,
        schema: ActionSchema,
      }
    ])
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule { }
