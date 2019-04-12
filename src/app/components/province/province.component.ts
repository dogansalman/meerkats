import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';

@Component({
  selector: 'app-province',
  templateUrl: 'province.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ProvinceComponent {

  provinces: any[];
  public selectedProvince;

  @Output() _cities = new EventEmitter<any[]>();

  // TODO On selection changed do not fire. updateDistricts function in districtComponents
  constructor(private http: HttpRequestService) {
    this.http.get('http://geodata.solutions/api/api.php?type=getStates&countryId=TR', {}).subscribe(data => {
      this.provinces = [];
      Object.keys(data.result).forEach(key => {
        this.provinces.push({id: key, name: data.result[key]});
      });
      this.provinces.sort((a, b) => a.name.localeCompare(b.name));
      this._cities.emit(this.provinces);
    });
  }
}
