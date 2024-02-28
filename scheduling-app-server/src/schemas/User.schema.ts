import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ unique: false, required: true })
    password: string;

    @Prop({ required: false })
    displayName?: string;

    @Prop({ required: false })
    avatarUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);