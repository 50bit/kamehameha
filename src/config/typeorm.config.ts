import { TypeOrmModuleOptions } from '@nestjs/typeorm' ;
export const typeOrmConfig:TypeOrmModuleOptions = {
    type:'postgres',
    username:'tskcyeny',
    host:'rajje.db.elephantsql.com',
    port:5432,
    database:'tskcyeny',
    password : 'OU3ISvPHnz8aBvvUZxZGC6puKKJcvwGk',
    entities : [__dirname + '/00/**/*.entity.ts'],
    synchronize:true 
};