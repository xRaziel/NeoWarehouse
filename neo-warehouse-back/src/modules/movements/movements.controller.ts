import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movements')
@ApiTags('Movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get("/getAllMovements")
  @ApiOperation({ summary: 'Retrieve all movements' })
  async getAllMovements() {
    try{
      const movements = await this.movementsService.getAllMovements();
      if (!movements || movements.length === 0) {
        return { status: 'success', data: [], message: 'No movements found' };
      }
      return { status: 'success', data: movements };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Post("/createMovement")
  @ApiOperation({ summary: 'Create a new movement' })
  async createMovement(@Body() createMovementDto: CreateMovementDto) {
    try{
      const newMovement = await this.movementsService.createMovement(createMovementDto);
      return { status: 'success', data: newMovement };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
