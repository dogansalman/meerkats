export class Order {
  $uid?: string;
  created_date: Date;
  updated_date: Date;
  total: Number;
  discount: Number;
  /* Does not use in pos system yet*/
  user_id: string;
  /* status 1 active order 0 passive order (closed table)*/
  status: boolean;
  payment_type: string;

  constructor() {
    this.created_date = new Date();
    this.discount = 0;
    this.total = 0;
    this.status = true;
  }

  /* Ürün masa ve çalışan kaydının siparişden sonra silinmesine karşın ve bilginin kaybolmasını önlemek için
  $uid siparişin id sini temsil etmektedir.
  Table, Employee, Product detayları aşağıdaki şekilde kayıt edilecektir.
  ..../$uid/table/
  ..../$uid/products/
  ..../$uid/employee/
  * */
}

