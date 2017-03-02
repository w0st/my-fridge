import t from 'tcomb-form-native';
import moment from 'moment/src/moment';

const FutureDate = t.refinement(t.Date, function (date) {
  diff = moment(date).diff(moment().startOf('day'), 'days')
  return diff >= 0;
});

export default FutureDate;