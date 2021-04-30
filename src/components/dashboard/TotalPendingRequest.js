import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const TotalPendingRequest = (props) => {
  const { loading = false } = props;
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
                variant="h6"
              >
                TOTAL Pending Request
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={200} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                15
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: '#103145',
                  height: 56,
                  width: 56
                }}
              >
                <HistoryOutlinedIcon />
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

export default TotalPendingRequest;

TotalPendingRequest.propTypes = {
  loading: PropTypes.bool.isRequired,
};
