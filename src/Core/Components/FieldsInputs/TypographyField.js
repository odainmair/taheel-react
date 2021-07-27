
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box } from '@material-ui/core';

export default function TypographyInput(props) {
    const margin = !!props.margin ? props.margin : 1;

    if (!!props.name) {
        const gridSize = !!props.gridSize ? props.gridSize : 12
        return (
            <Grid item xs={gridSize} >
                <Box m={margin} >
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                        {props.tLabel}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {
                            !props.isLoading ? (
                                !!props.attrFunc ?
                                    props.attrFunc(props.values)
                                    :
                                    props.values[props.attrName]
                            )
                                :
                                (<Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />)
                        }
                    </Typography>
                </Box>
            </Grid>
        )
    } else {

        return (<Box m={margin}>
            <Typography component="h3">
                {props.textTitle}
            </Typography>
        </Box>);
    }
}
TypographyInput.propTypes = {
    textTitle: PropTypes.string,
    margin: PropTypes.number,
    values: PropTypes.object,
    gridSize: PropTypes.number,
    attrFunc: PropTypes.func,
    attrName: PropTypes.string,
    name: PropTypes.string,
    isLoading: PropTypes.bool,
}