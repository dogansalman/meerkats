import {Component, ViewEncapsulation, Input} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';

@Component({
  selector: 'app-district',
  templateUrl: 'district.component.html',
  encapsulation: ViewEncapsulation.None
})

export class DistrictComponent {

  districts: any[];
  @Input() country_id: string;


  _province_id: string;
  get province_id(): string {
    return this._province_id;
  }

  @Input('province_id')
  set province_id(value: string) {
    this._province_id = value;
    this.updateDistrict();
  }

  constructor(private http: HttpRequestService) {}

  public updateDistrict(): void {
    this.http.get('http://geodata.solutions/api/api.php?type=getCities&countryId=' + this.country_id + '&stateId=' + this.province_id, {}).subscribe(data => {
      this.districts = [];
      Object.keys(data.result).forEach(key => {
        this.districts.push({id: key, name: data.result[key]});
      });
      this.districts.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
