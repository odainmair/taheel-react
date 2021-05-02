import {
  Avatar,
  Card,
  CardContent,
  Grid,
  colors,
  Typography
} from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const TotalCompletedRequest = (props) => {
  const { loading = false, totalcompletedrequests = 0 } = props;
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            {loading ? (
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
              >
                مجموع الطلبات المكتملة
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={200} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {totalcompletedrequests}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: colors.green[600],
                  height: 56,
                  width: 56
                }}
              >
                <DoneOutlineOutlinedIcon />
              </Avatar>
            ) : (
              <Skeleton animation="wave" variant="circle" height={56} width={56} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalCompletedRequest;

TotalCompletedRequest.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalcompletedrequests: PropTypes.number.isRequired
};
