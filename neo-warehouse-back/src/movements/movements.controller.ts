import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movements')
@ApiTags('Movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movement' })
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all movements' })
  findAll() {
    return this.movementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a movement by ID' })
  findOne(@Param('id') id: string) {
    return this.movementsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movement by ID' })
  update(@Param('id') id: string, @Body() updateMovementDto: UpdateMovementDto) {
    return this.movementsService.update(+id, updateMovementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movement by ID' })
  remove(@Param('id') id: string) {
    return this.movementsService.remove(+id);
  }
}
