import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule} from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    MongooseModule.forRootAsync({
    // load connection string from .env file. 
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGODB_URI'), 
    })
  }), UsersModule],
  controllers: [],
  providers: [],
})

export class AppModule{}