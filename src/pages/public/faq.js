/* eslint-disable */
import { Grid, Box, Typography, CardMedia, Card, CardContent, Paper } from '@material-ui/core';
import Faq from 'react-faq-component';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { makeStyles } from '@material-ui/core/styles';
import DashboardNavbar from '../../components/DashboardNavbar';
import MainNavbar from '../../components/MainNavbar';
import Footer from './Footer';
import { useState } from 'react';
import { Helmet } from 'react-helmet'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    height: 'auto',
  },

  jumboStyle: {
    backgroundImage: "url(/static/images/Home/photo_diable_2.jpg)",
    height: "400px",
    position: "relative",
    padding: "0px 25px",
    [theme.breakpoints.down('md')]:{
      backgroundPositionX: "50%",
    },
    "& .jumboTextContainer": {
      bottom: "10px",
      position: "absolute",
      width: "30%",
      [theme.breakpoints.down('md')]:{
        width: "90% !important",
      }
    },

    "& h1": {
      color: "white",
    },

    "& p": {
      color: "white",
    }
  },

  containerMargins:{
    marginLeft:"20% !important",
    marginRight:"20% !important",
    [theme.breakpoints.down('xl')]:{
      marginLeft:"5% !important",
      marginRight:"5% !important",
    },
    [theme.breakpoints.down('md')]:{
      marginLeft:"5% !important",
      marginRight:"5% !important",
    }
  },

}));

const data = {
  title: "الأسئلة الشائعة عن خدمات المنصة",
  rows: [
    {
      title: "ماهي الفئة التي تستهدفها خدمات المنصة؟",
      content: "الفئات التي تستهدفها خدمات المنصة، هم:" + "<br/>" +
        "-	كبار السن" + "<br/>" +
        "-	الأيتام" + "<br/>" +
        "-	المتسولين" + "<br/>" +
        "-	الأحداث " + "<br/>" +
        "-	ذوي الإعاقة" + "<br/>" +
        "-	المراكز الأهلية" + "<br/>"

    },
    {
      title: "ماهي الخدمات المتوفرة لفئة ذوي الإعاقة في المنصة؟",
      content: "-	خدمة طلب تقييم الإعاقة" + "<br/>" +
        "-	طلب موعد لتقييم الإعاقة (الخدمات المساندة) " + "<br/>" +
        "-	طلب موعد لتقييم الإعاقة (الزيارة المنزلية) " + "<br/>" +
        "-	طلب الغاء موعد لتقييم الإعاقة " + "<br/>" +
        "-	خدمة تقديم طلب منح اعفاء من رسوم التأشيرة" + "<br/>" +
        "-	خدمة طلب بطاقات تخفيض أجور الاركاب" + "<br/>" +
        "-	خدمة طلب بطاقة التسهيلات المرورية" + "<br/>" +
        "-	خدمة إصدار بطاقة تعريف بالإعاقة اضطراب التوحد" + "<br/>" +
        "-	خدمة طلب تصنيف الإعاقة للطلبة الجامعيين وفئة الاعانة" + "<br/>" +
        "-	خدمة اصدار مشهد إعاقة" + "<br/>" +
        "-	خدمة طلب أجهزة طبية او مساندة" + "<br/>" +
        "-	خدمة طلب الاعانة المالية - للأشخاص ذوي الإعاقة" + "<br/>"

    },
    {
      title: "ماهي الخدمات المتوفرة لفئة الأيتام في المنصة؟",
      content: "-	التقديم على برنامج الأسر الكافلة" + "<br/>" +
        "-	طلب الاستضافة لدى أسرة صديقة" + "<br/>" +
        "-	إسناد يتيم لأسرة كافلة" + "<br/>" +
        "-	طلب مكافأة نهاية احتضان" + "<br/>" +
        "-	اصدار شهادة تعريف بالاحتضان" + "<br/>" +
        "-	خدمة طلب خطاب توصية للإيتام" + "<br/>" +
        "-	طلب (اصدار، تجديد) جواز سفر، تصريح سفر" + "<br/>" +
        "-	 خدمة طلب ابتعاث " + "<br/>" +
        "-	المواصلات والنقل المدرسي" + "<br/>" +
        "-	خدمات الحساب الاستثماري " + "<br/>" +
        "-	طلب الصرف من الحساب الاستثماري" + "<br/>" +
        "-	التعليم الحكومي / الأهلي" + "<br/>" +
        "-	دروس التقوية" + "<br/>" +
        "-	طلب تسديد الرسوم الدراسية" + "<br/>" +
        "-	الدورات التدريبية" + "<br/>" +
        "-	التدريب والتمكين" + "<br/>" +
        "-	طلب إعانة الزواج للأيتام" + "<br/>" +
        "-	طلب اعانة لأسرة كافلة" + "<br/>" +
        "-	طلب اعانة للمستفيدين المحلقين بمؤسسة اخاء" + "<br/>" +
        "-	طلب اصدار الأوراق الثبوتية" + "<br/>" +
        "-	طلب صرف المكافأة الشهرية للأيتام" + "<br/>"
    },
    {
      title: "ماهي الخدمات المتوفرة لفئة الإرشاد الأسري في المنصة؟",
      content: "تضاف لاحقاً"
    },
    {
      title: "ماهي الخدمات المتوفرة لفئة كبار السن في المنصة؟",
      content: "تضاف لاحقاً"
    },
    {
      title: "ماهي الخدمات المتوفرة للمراكز الاهلية في المنصة؟",
      content: "-	السجل الاستثماري " + "<br/>" +
        "-	خدمة اصدار شهادة ترخيص مؤقت لمركز أهلي " + "<br/>" +
        "-	خدمة تغيير موقع - ترخيص مؤقت لمركز أهلي " + "<br/>" +
        "-	خدمة الغاء شهادة ترخيص مؤقت لمركز أهلي " + "<br/>" +
        "-	خدمة اصدار شهادة ترخيص نهائي لمركز أهلي " + "<br/>" +
        "-	خدمة تجديد ترخيص نهائي لمركز أهلي " + "<br/>" +
        "-	طلب تسهيلات حكومية" + "<br/>" +
        "-	خدمة مواءمة وتحديث بيانات مركز أهلي" + "<br/>" +
        "-	خدمة نقل ملكية لمركز أهلي " + "<br/>" +
        "-	خدمة نقل مقر لمركز أهلي " + "<br/>" +
        "-	طلب الغاء ترخيص لمركز أهلي (من المالك)" + "<br/>" +
        "-	خدمة طلب تعليق العمل في مركز أهلي (من المالك) " + "<br/>" +
        "-	تسجيل وإدارة بيانات المستفيدين" + "<br/>" +
        "-	تسجيل واعتماد البرامج المقدمة في المراكز " + "<br/>" +
        "-	طلب التسجيل في برنامج تحمل الدولة للرسوم " + "<br/>" +
        "-	الاعتراض على الغرامات " + "<br/>" +
        "-	برنامج تحمل الدولة للرسوم" + "<br/>" +
        "-	المطالبة المالية" + "<br/>"
    },
    {
      title: "ماهي الخدمات المتوفرة للأحداث في المنصة؟",
      content: "تضاف لاحقاً"
    },
    {
      title: "هل يوجد دعم مالي من خلال المنصة؟",
      content: "لا. بالإمكان التوجه الى منصة الدعوم لمزيداً من التفاصيل."
    },
    {
      title: "هل يستطيع ولي الامر أو الوصي الشرعي طلب الخدمات بالنيابة عن المستفيد؟",
      content: "نعم بإمكان ولي الأمر أو الوصي الشرعي طلب الخدمات بالنيابة عن المستفيد بعد ان تتحقق المنصة من ذلك."
    }
  ]
}

const FAQ = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Helmet>
          <title>أسئلة شائعة</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />


      <Jumbotron className={classes.jumboStyle}>
        <div class="jumboTextContainer">
          <h1 className='centerme'>الأسئلة الشائعة</h1>
          <p className='centerme'>
            تعرض هذه الصفحة الأسئلة الأكثر شيوعاً، وسيتم تحديث وتوسيع هذه الصفحة دورياً. إذا كان لديك أي سؤال الرجاء إرساله من خلال قسم اتصل بنا. نرحب بأسئلتكم واقتراحاتكم.
          </p>
        </div>
      </Jumbotron>


      <Grid container
        sx={{
          background: "#e2e8eb",
          fontFamily: 'FrutigerLTArabic-55Roman',

        }}>



        
        <Grid container className={classes.containerMargins}
          sx={{
            mt: "30px",
            mb: "70px"
          }}
        >
          <Grid item md={12} >
            <Faq
              data={data}

              styles={{
                titleTextColor: "#757070",
                rowTitleColor: "#757070",
                rowContentPaddingLeft: '60px',
                rowContentPaddingRight: '60px',
              }}
            />
          </Grid>



        </Grid>

      </Grid>
      <Footer />
    </div>
  );
};

export default FAQ;

