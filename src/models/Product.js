import t from 'tcomb-form-native';

export const Product = t.struct({
  name: t.String,              // a required string
  category: t.maybe(t.String),  // an optional string
  expiryDate: t.Date
});
