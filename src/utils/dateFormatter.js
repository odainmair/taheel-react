
import moment from 'moment-hijri';

export default (d) => { return moment(d, 'iDD/iMM/iYYYY').format('iDD iMMM iYYYY')};

