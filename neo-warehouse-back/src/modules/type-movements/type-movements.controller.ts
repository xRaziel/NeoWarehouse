import { Controller, Get } from '@nestjs/common';
import { TypeMovementsService } from './type-movements.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('type-movements')
@ApiTags('Type Movements')
export class TypeMovementsController {
  constructor(private readonly typeMovementsService: TypeMovementsService) {}

  @Get("getAllTypeMovements")
  @ApiOperation({ summary: 'Retrieve all type movements' })
  async getAllTypeMovements() {
    try{
      const typeMovements = await this.typeMovementsService.getAllTypeMovements();
      if (!typeMovements || typeMovements.length === 0) {
        return { status: 'success', data: [], message: 'No type movements found' };
      }
      return { status: 'success', data: typeMovements };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  };
}
