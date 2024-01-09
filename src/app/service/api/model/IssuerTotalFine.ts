export interface IssuerTotalFine{
  "total_items": number,
  "total_amount": number,
  "today_date_time": "",
  "per_day_amount":0,
  "fines" :Array<IssuerFine>,
  "issuerInfo": FineIssuerInfo
}
export interface IssuerFine  {
  "item_unique_id": "",
  "item_title": "",
  "issuer_unique_id": "",
  "issuer_name": "",
  "borrow_id": number,
  "borrow_date": "",
  "expected_return_date": "",
  "pending_days": number,
  "per_day_amount": number,
  "total_amount": number
}
export interface FineIssuerInfo{
  "name": "",
  "issuer_type": "",
  "issuer_class": "",
  "contact": "",
  "issuer_unique_id": "",

}
