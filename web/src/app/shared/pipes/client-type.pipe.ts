import { Pipe, PipeTransform } from '@angular/core';

import { ApiService } from '../services';

@Pipe({
  name: 'clientType',
  pure: false,
})
export class ClientTypePipe implements PipeTransform {
  constructor(private apiService: ApiService) { }

  transform(value: string): string {
    return this.apiService.getClientTypeById(Number(value));
  }
}
