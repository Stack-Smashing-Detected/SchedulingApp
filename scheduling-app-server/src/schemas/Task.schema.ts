import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Task {
    @Prop({ required: true })
    taskName: string

    @Prop({ required: true })
    startTime: string

    @Prop({ required: true })
    endTime: string
}

export const TaskSchema = SchemaFactory.createForClass(Task);
