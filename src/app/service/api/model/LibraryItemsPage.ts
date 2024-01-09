
export interface Item{
  id?:number,
  borrow_id?: number,
  quantity?: number,
  item_name?:String,
  item_unique_id?: string,
  issuer_unique_id?: string,
  borrowDate?: String,
  expectedReturnDate?: String,
  actualReturnDate?: any,
  isReturnPeriodOver?:boolean,
  returnStatus?: boolean,
  itemCondition?: any,
  itemType?:'',
  description?:'',
  itemLocation?:'',
  itemLanguage?:'',
  publisher?:''
}
export interface LibraryItemsPage{
  page_no?:number,
  total_pages?:number,
  items?:Array<Item>,
  total_records?:number,
  page_size?:number
}
