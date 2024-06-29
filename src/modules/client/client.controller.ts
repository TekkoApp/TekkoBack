import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDTO: CreateClientDTO) {
    return this.clientService.create(createClientDTO);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDTO: UpdateClientDTO) {
    return this.clientService.update(+id, updateClientDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
