import { Injectable } from '@nestjs/common';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import AutocompleteFailure from './exceptions/autocompleteFailure.exception';
import CreateLocationDTO from './dto/create-location.dto';

@Injectable()
export class LocationService {
  @InjectRepository(Location)
  private readonly locationRepository: Repository<Location>

  async create(locationDTO: CreateLocationDTO): Promise<Location> {
    return  await this.locationRepository.save(locationDTO);
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }

  async getPlacesAutocompleteResults (body: any): Promise<string[]> {
    const google_autocomplete_url = process.env.GOOGLE_AUTOCOMPLETE_URL;
    const locations: string[] = [];
    const googleKey = process.env.GOOGLE_AUTOCOMPLETE_KEY ;
    const params = {
        input: body.entity,
        key: googleKey,
    };
    const response = await axios.get(google_autocomplete_url, { params });
    if (response.status !== 200) {
        throw new AutocompleteFailure();
    }
    response.data.predictions.map(el => {
        const address = el.description;
        locations.push(address);
    });
    return locations;
}

}
