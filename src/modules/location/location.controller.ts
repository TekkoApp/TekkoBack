import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import  CreateLocationDto  from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import HttpPostException from '../base/exceptions/httpPost.exception';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }

  @ApiOperation({description: 'Generate suggestions for autocomplete' })
  @Post('/addressAutocomplete')
  @ApiResponse({
    status: 201,
    description: 'Returns an array of suggested addresses',
    isArray: true,
    type: String,
  })
  async getAddressesForAutocomplete(@Body() entity:string):Promise<string[]> {
      try {
          const suggestedAddresses = await this.locationService.getPlacesAutocompleteResults(entity);
          return suggestedAddresses;
      } catch (err) {
          throw new HttpPostException(err).toHttpResponse();
      }
  }
}
