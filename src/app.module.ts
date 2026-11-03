import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FacultiesModule } from './faculties/faculties.module.js';
import net from 'net';

function checkPostgresConnection(): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(400);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(5432, 'localhost');
  });
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const isPgRunning = await checkPostgresConnection();
        if (isPgRunning && process.env.DB_TYPE !== 'sqljs') {
          return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: process.env.DB_PASSWORD || 'admin',
            database: process.env.DB_NAME || 'myTestDB2',
            autoLoadEntities: true,
            synchronize: true,
          };
        }
        return {
          type: 'sqljs',
          autoSave: true,
          location: 'faculties.db',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    FacultiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
