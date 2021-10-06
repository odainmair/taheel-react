import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types'

export default function ButtonField(props) {

    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fontSize="large"
            style={{width:"25%"}}
            disabled={props.loading}
        >
            {props.loading && <CircularProgress size={25} style={{ color: 'green' }} />}
            {props.btnName}
        </Button>
    );
}
ButtonField.propTypes = {
    btnName: PropTypes.string,
    loading: PropTypes.bool,
}