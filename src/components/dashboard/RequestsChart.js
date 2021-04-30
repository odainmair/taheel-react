import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const RequestsChart = (props) => {
  const { loading = false } = props;
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [10, 15],
        backgroundColor: [
          colors.green[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Completed', 'Pending']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Completed',
      value: 55,
      icon: DoneOutlineOutlinedIcon,
      color: colors.green[600]
    },
    {
      title: 'Pending',
      value: 45,
      icon: HistoryOutlinedIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader
        title={
          loading ? (
            'My Request'
          ) : (
            <Skeleton animation="wave" height={15} width="60%" style={{ marginBottom: 6 }} />
          )
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          {loading ? (
            <Doughnut
              data={data}
              options={options}
            />
          ) : (
            <Skeleton
              animation="wave"
              variant="circle"
              height={290}
              width={290}
              style={{
                margin: '0 auto'
              }}
            />
          )}
        </Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            {devices.map(({
              color,
              icon: Icon,
              title,
              value
            }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center'
                }}
              >
                <Icon color="action" />
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  style={{ color }}
                  variant="h2"
                >
                  {value}
                  %
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            <Box>
              <Skeleton
                animation="wave"
                variant="rect"
                height={10}
                width={290}
                style={{
                  marginTop: 6
                }}
              />
              <Skeleton
                animation="wave"
                variant="rect"
                height={10}
                width={290}
                style={{
                  marginTop: 6
                }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestsChart;

RequestsChart.propTypes = {
  loading: PropTypes.bool.isRequired,
};
