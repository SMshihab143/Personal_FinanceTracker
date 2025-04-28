import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Import TypeOrmModule
import { SideHustleService } from './sidehustle.service';
import { SideHustleController } from './sidehustle.controller';
import { SideHustle } from './sidehustle.entity';  // Import the SideHustle entity

@Module({
  imports: [TypeOrmModule.forFeature([SideHustle])],  // Register the entity in the module
  providers: [SideHustleService],
  controllers: [SideHustleController],
})
export class SideHustleModule {}
