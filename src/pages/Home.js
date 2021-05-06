/* eslint-disable */
import { Grid, Box, Typography, CardMedia, Card, CardContent, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    height: 'auto',
  },
  name: {
    fontFamily: "FrutigerLTArabic-75Black",
    color: "#FFFFFF",
    fontWeight: 'bolder',
    fontSize: '3.5vw',
    padding: '0.5em',
    textAlign: 'right',

  },

  description: {
    fontFamily: "FrutigerLTArabic-75Black",
    marginRight: '20px',
    color: "#FFFFFF",
    width: '300px',
    textAlign: 'right',

    fontSize: '1.5vw',
  },

  box: {
    position: "absolute",
    top: '20%',
    bottom: 'auto',
    left: 'auto',
    right: ' 60px',
    color: ' #fff',
    textAlign: 'center',
    textShadow: '0 1px 2px rgb(0 0 0 / 60%)',

  },
  header: {
    position: "absolute",
    top: '0%',
    bottom: 'auto',
    left: 'auto',
    right: '-2%',
    fontFamily: "FrutigerLTArabic-55Roman",
    textAlign: 'right',
    color: 'white',
    fontSize: '1.3vw',

  }

}));

const items = [
  {
    name: 'ذوي الاعاقة',
    description: " تـعد الرعايـة النـهارية أحد الركائـز الأساسية لدى وكالة التأهيل والتوجية الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية ",
    image: 'https://demo-spa.taheel.tech/landing/images/photo_diable_2.jpg'
  },
  {
    name: "كبار السن",
    description: " تعد رعاية كبار السن أحد الركائز الاساسية لدى وكالة التأهيل والتوجية الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية ",
    image: 'https://demo-spa.taheel.tech/landing/images/photo_old_3.jpg'
  },
  {
    name: "الأيتام",
    description: " تعد رعاية الايتام أحد الركائز الاساسية لدى وكالة التأهيل والتوجية الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية ",
    image: 'https://demo-spa.taheel.tech/landing/images/photo_orphan_4.jpg'
  }
]

const services = [
  {
    name: "خـدمات التأسـيس",
    description: "تتيح هذه الخدمة للمواطن او المواطنة تأسيس مركز تأهيل أهلي ",
    image: 'https://demo-spa.taheel.tech/landing/icons/Icon-building.png'
  },

  {
    name: "خـدمـات المستـفيديـن",
    description: "تتيح هذه الخدمة للمركز تحديث بيانات المستفيدين",
    image: 'https://demo-spa.taheel.tech/landing/icons/icon-users.png'
  },

  {
    name: "خـدمـات الـمركـز",
    description: "تتيح هذه الخدمة للمركز ادارة بياناته ",
    image: 'https://demo-spa.taheel.tech/landing/icons/icon-file.png'
  }
]

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}
      sx={{
        background: "#e2e8eb",
        fontFamily: 'FrutigerLTArabic-55Roman',
      }}>

      <Grid item xs={12}>

        <Carousel
          className={classes.root}
          next={() => { }}
          prev={() => { }}
        >

          {
            items.map((item, i) =>
              <Box key={i} item={item} >
                <CardMedia
                  className={classes.root}
                  component="img"
                  alt={item.name}
                  image={item.image}
                  title={item.name}
                />
                <pre
                  className={classes.header}
                >
                  {`
            المنصة الوطنية للتأهيل
            والتوجيه الاجتماعي | تأهيل
                 `}
                </pre>
                
                <Box
                  className={classes.box}
                >
                  <Typography
                    className={classes.name}
                    variant="h1"
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    className={classes.description}
                  >
                    {item.description}
                  </Typography>

                </Box>

              </Box>
            )
          }
        </Carousel>

      </Grid>
      <Grid container spacing={1}
        sx={{

          mr: '10%',
          ml: '10%',

        }}
      >
        <Grid item md={6}
          sx={{
            mb: '-1%',
            width: "70%",
            zIndex: '100',
          }}
        >


          <Paper elevation={0}
            sx={{
              borderRadius: '28px',
              background: '#f0b843',
              padding: '12px',
            }}
          >
            <img style={{
              height: '200px',
              borderRadius: '6px',
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: '2%',
              padding: '0%',
            }}
              src="https://demo-spa.taheel.tech/landing/images/photo1.png" />
          </Paper>
        </Grid>

        <Grid item md={6}
          sx={{ width: "70%", }}>
          <Card
            sx={{
              marginTop: '2%',
              marginRight: '-12px',
              background: '#FFFFFF',
              borderRadius: '28px',
              padding: '13%'

            }}
          >
            <Typography
              color="#3c8084"
              variant="h1"
              fontSize='200%'
              mt='-8%'

            >
              هدفنا
          </Typography>

            <Typography
              fontSize='90%'
              color="#757070"
              variant="body3"
              fontFamily='FrutigerLTArabic-55Roman'
            >
              تهدف هذه المنصة الى تحسين وتسهيل الاجراءات المتعلقة بمراكز التأهيل الاهلي بالنسبة للمستفيدين وملاك المراكز وكذلك الوزارة مع رفع جودة الاعمال الميدانية
          </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1}
        sx={{

          mr: '10%',
          ml: '10%',

        }}
      >
        <Typography
          color="#3c8084"
          variant="h1"
          mr='10%'
          mt='3%'
          mb='-10%'
        >
          خدماتنا
      </Typography>

        <svg width="100%" height="370px" viewBox="0 0 2069.587 356.923" class="landing-svg-line"><path data-v-b9e75930="" id="Path_6244" data-name="Path 6244" d="M-15735.4,2560.17s34.461-51.341,126.386-103.4a680.927,680.927,0,0,1,87.795-41.467c54.489-21.3,120.887-40.094,201.262-52.284,69.314-10.513,148.889-16.117,240.039-14.176,78.566,1.673,161.364,4.321,245.547,6.861,90.911,2.743,183.819,5.375,275.759,6.576,118,1.542,234.407.73,343-5.219q25.239-1.383,50-3.153c214.853-15.405,393.793-53.621,484.705-137.748" transform="translate(15743.703 -2208.82)" fill="none" stroke="#eb993f" stroke-width="20"></path></svg>
        <Grid container spacing={1}
          sx={{
            mr: '10%',
            ml: '10%',
          }}
        >
          {
            services.map((service, i) =>
              <Grid item xs={4}
                sx=
                {{
                  zIndex: '100',
                  position: 'relative',
                  top: '-290px',
                  bottom: 'auto',
                  left: 'auto',

                }}
              >
                <CardMedia
                  style={{
                    width: '100%',
                    height: '100%',
                    paddingTop: '35px',
                    width: "auto",
                    maxHeight: "150px",
                  }}
                  component="img"
                  alt={service.name}
                  image={service.image}
                  title={service.name}
                />

                <Typography
                  variant="h1"
                  fontSize='110%'
                  color='#214256'
                >
                  {service.name}
                </Typography>

                <Typography
                  fontSize='90%'
                  variant="body3"
                  fontFamily='FrutigerLTArabic-55Roman'
                  color='#7c7c7c'
                >
                  {service.description}
                </Typography>
              </Grid>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
