import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}


}
