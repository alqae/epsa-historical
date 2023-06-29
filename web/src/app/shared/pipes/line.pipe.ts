import { Pipe, PipeTransform } from '@angular/core';

import { ApiService } from '../services';

@Pipe({
  name: 'line',
  pure: false
})
export class LinePipe implements PipeTransform {
  constructor(private apiService: ApiService) { }

  transform(value: string): string {
    return this.apiService.getLineById(Number(value));
  }
}
