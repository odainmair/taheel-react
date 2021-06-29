
import moment from 'moment-hijri';

const dateFormatter = (d) => { return moment(d, 'iDD/iMM/iYYYY').format('iDD iMMM iYYYY')};

const reverseRange = (s) => {
  const range = s.trim().split('-')
  return `${range[0]} - ${range[1]}`;
}

export {dateFormatter, reverseRange};