import { Component, OnInit, AfterContentInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {orders} from '../interfaces/orders';
import {order} from '../interfaces/order';




const detail: order = {
  product: 'Latte',
    product_id: 2,
    unit: 1
}
const ELEMENT_DATA: orders[] = [
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  },
  {
    note: 'Çay şekersiz ve latte sütsüz lütfen.',
    state: 'Yeni',
    table_location: 'Bahçe',
    table_id: 2,
    table_numb: 'BHÇ-0004',
    order: [
      {
        product: 'Latte',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Çay',
        product_id: 2,
        unit: 1
      },
      {
        product: 'Türk Kahvesi',
        product_id: 2,
        unit: 1
      }

    ]
  }
];


@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit, AfterContentInit {

  displayedColumns: string[] = ['Masa No', 'Sipariş', 'Not',];
  dataSource = ELEMENT_DATA;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  ngAfterContentInit(){
    this.spinner.hide();
 }

}
