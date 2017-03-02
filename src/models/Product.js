import t from 'tcomb-form-native';
import FutureDate from './FutureDate';

var Category = t.enums({
	meat: 'Meat',
	dairy: 'Dairy',
	vegetables: 'Vegetables',
	fruits: 'Fruits'
});

export const Product = t.struct({
  name: t.String,              // a required string
  //category: t.maybe(t.String),  // an optional string
  category: t.maybe(Category),
  expiryDate: FutureDate
});
