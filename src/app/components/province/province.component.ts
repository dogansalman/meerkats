import {Component, ViewEncapsulation, Output, Input, EventEmitter, ViewChild, OnInit, Renderer2} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {MatOptionSelectionChange, MatSelect} from '@angular/material';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'component-province',
  templateUrl: 'province.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})

export class ProvinceComponent implements OnInit {

  provinces: any[];
  public selectedProvince;

  @Output() _provinces = new EventEmitter<any[]>();
  @Output() _selectedChange = new EventEmitter<any>();
  @Output() _loadEnd = new EventEmitter<any>();
  @Input()  _FormGroupName: string;
  @Input()  _FormControlName: string;
  @ViewChild(MatSelect) select: MatSelect;

  ngOnInit(): void {
    this.renderer.addClass(this.select._elementRef.nativeElement, 'loading');
    this.select.disabled = true;

    this.http.get('//geodata.solutions/api/api.php?type=getStates&countryId=TR', {}).subscribe(data => {
      this.provinces = [];
      Object.keys(data.result).forEach(key => {
        this.provinces.push({id: key, name: data.result[key]});
      });
      this.provinces.sort((a, b) => a.name.localeCompare(b.name));
      this._provinces.emit(this.provinces);
      this.renderer.removeClass(this.select._elementRef.nativeElement, 'loading');
      this.select.disabled = false;
    });
  }

  constructor(private http: HttpRequestService, private renderer: Renderer2)  { }
  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
  onSelectedProvince(e: MatOptionSelectionChange): void {
    if (e.source.value !== this.selectedProvince && this.selectedProvince) {
      this._selectedChange.emit(e.source.value);
    }
    if (e.source.selected) {
      this.selectedProvince = e.source.value;
    }
  }
}
