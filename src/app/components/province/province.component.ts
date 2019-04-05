import {Component, ViewEncapsulation} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {CityStates} from '../../interfaces/city_states';

@Component({
  selector: 'app-province',
  templateUrl: 'province.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ProvinceComponent {

  cities: CityStates[];

  constructor(private http: HttpRequestService) {
    this.http.get('http://geodata.solutions/api/api.php?type=getStates&countryId=TR', {}).subscribe(data => {
      this.cities = [];
      Object.keys(data.result).forEach(key => {
        this.cities.push({id: key, name: data.result[key]} as CityStates);
      });
      this.cities.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
