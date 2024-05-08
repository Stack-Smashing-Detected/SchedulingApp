import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Action {
    @Prop({ required: true })
    actionName: string;

    @Prop({ required: true })
    duration: number;
}

export const ActionSchema = SchemaFactory.createForClass(Action);