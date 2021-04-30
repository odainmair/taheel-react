import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const TotalCompletedRequest = (props) => {
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
                TOTAL Completed Requests
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={200} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                10
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
};
