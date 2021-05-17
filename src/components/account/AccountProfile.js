import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getCurrentUser } from 'src/utils/UserLocalStorage';

const { firstName, lastName } = getCurrentUser();
const user = {
  avatar: '/static/images/avatars/avatar_4.png',
  city: 'الرياض',
  country: 'السعودية',
  jobTitle: 'Manager',
  name: `${firstName} ${lastName}`,
  timezone: 'GTM-7'
};

const AccountProfile = (props) => {
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            sx={{
              height: 80,
              width: 80
            }}
          >
            <AccountCircleIcon accentHeight={60} fontSize="large" />
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          تحميل صورة
        </Button>
      </CardActions>
    </Card>
  )
};

export default AccountProfile;
