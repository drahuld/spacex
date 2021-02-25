import moment from 'moment';
import Vue from 'vue';

/**
 * Date vMMue filter. This filter format the date to DD.MM.YYYY hh:mm format.
 */
Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY HH:mm');
  }
  return value;
});

/**
 * Date vMMue filter. This filter format the date to DD.MM.YYYY hh:mm format.
 */
Vue.filter('format_Date_dd_mm_yyyy', (value) => {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY');
  }
  return value;
});

/**
 * Date vMMue filter. This filter format the date to format_Date_yyyy format.
 */
Vue.filter('format_Date_yyyy', (value) => {
  if (value) {
    return moment(String(value)).format('YYYY');
  }
  return value;
});

/**
 * Date vMMue filter. This filter format the date to DD.MM.YYYY hh:mm format.
 */
Vue.filter('toUppercase', (value) => {
  if (value) {
    return value.toUpperCase();
  }
  return value;
});
