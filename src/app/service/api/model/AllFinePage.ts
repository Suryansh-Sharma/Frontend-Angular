export interface AllFinePage{
  "page_no": 0,
  "total_pages": 1,
  "items": Array<Item>,
  "total_records": 0,
  "page_size": 0
}
interface Item {
  "id": 1,
  "payed_on": "",
  "total_amount": 0,
  "download_slip": "",
  "total_items": 1,
  "issuer_info":IssuerInfo
}

interface IssuerInfo {
  "id": 0,
  "first_name": "",
  "last_name": "",
  "roll_no": 0,
  "issuer_type": "",
  "contact_no": "",
  "email": "",
  "issuer_class": "",
  "unique_id": "",
  "issuer_branch": ""
}
