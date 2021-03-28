export const BASE_URL =
	'https://mock-backend-apiz.herokuapp.com/api/v1/products';

export const INITIAL_STATE = {
	itemList: [],
	loading: true,
	pageNumber: 1,
	resultsLoading: false,
	productDetails: {
		primary_product: {
			_id: '',
			desc: '',
			mark_price: 0,
			name: '',
			sale_msg: '',
			sale_price: 0,
			images: []
		},
		options_types: [],
		quantity: 1
	},
	cart: []
};

/* cart Structure 
	{	
		_id: String<ID>
		product_name: String,
		product_sale_price: Number,
		product_mark_price: Number,
		quantity: Number,
		product_total_price: Number,
		product_detail: Object{
			size: Number,
			color: String
		}
	}

*/
