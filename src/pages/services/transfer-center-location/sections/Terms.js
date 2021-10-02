


/* eslint-disable */
import React, { useState, useRef } from 'react';
import {
    Grid,
    FormControl,
    Typography,
    FormControlLabel,
} from '@material-ui/core';
import { TextField as TextFieldFinal, Checkbox } from 'final-form-material-ui';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

const Terms = ({ setField, values }) => {
    const [isAgree, setIsAgree] = React.useState(false);

    return (
        <>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >



                <div className="section-1 font-45Light">
                    <p className="section-headline">يجب أن يقر المالك على توفر الشروط التالية في المبنى المقرر الستخراج الترخيص المؤقت :</p>
                    <ul className="unordered-list">
                        <li className="unordered-list-item"> تعهد من المالك أن تكون األرض المخصصة للمركز على شارعين احدهما تجاري ال يقل عن عرض 15 متر

                        </li>
                        <li className="unordered-list-item"> تعهد من المالك أن يكون المركز مستقل و بمداخل خارجية مستقلة و في موقع مناسب للنشاط من حيث الهدوء و
                            سهولة الوصول اليه

                        </li>
                        <li className="unordered-list-item">
                            تعهد من المالك أال يكون المركز قريبا من مناطق صناعيه والتقل المسافة بين الموقع واقرب محطة وقود قائمة عن
                            1000 م
                        </li>
                        <li className="unordered-list-item">
                            ارفاق مخطط تفصيلي للمبنى يوضح الموقع و مكوناته و مرافقه ومسطح البناء و مساحته االجمالية مع تسمية
                            الفراغات، على أن ال تقل المساحة الكلية لألرض عن 732 ومسا حة مسطح البناء عن 600
                        </li>
                        <li className="unordered-list-item">
                            تعهد من المالك بالعمل على تهيئة البنية التحتية للمبنى أثناء فترة الترخيص المؤقت بحيث يتوافق مع االشتراطات
                            المذكورة في الملحق التفصيلي لمتطلبات البنية التحتية وتشمل :
                        </li>
                    </ul>
                    <div className="appendix">
                        <ol className="ordered-list">
                            <li className="ordered-list-item">  أخذ رخصة من البلدية على ممارسة النشاط مع صورة مصادقة من رخصة البناء</li>
                            <li className="ordered-list-item">  توفر متطلبات السالمه و مكافحة الحريق حسب أنظمة الدفاع المدني مع أخذ تصريح من الدفاع المدني
                                على مزاولة النشاط و يجدد سنويا</li>

                            <li className="ordered-list-item">  توفير تقرير من مكتب هندسي معتمد و مرخص من هيئة المهندسين يثبت :



                                <ul className="unordered-list">
                                    <li className="unordered-list-item">  أن تكون جميع مرافق المبنى سليمه انشائيا و كهربائيا و ممتازه من حيث التشطيب و خالية من
                                        العيوب الفنية و أن تراعى فيها ظروف األشخاص ذوي اإلعاقة بخدماتها و متطلبات الفئة
                                        العمرية من حيث البيئة اآلمنة كوضع الساللم و المنحدرات باإلضافة الى توفير المقابض
                                        الجدارية و تجهيز دورات المياه ومالحظة سعة األبواب و األسياب بما يوفر سهولة الحركة و
                                        تسمح بمرور الكراسي المتحركة و تطبيق كود الوصول الشامل المعتمد من قبل مركز الملك
                                        سلمان ألبحاث اإلعاقة </li>
                                    <li className="unordered-list-item"> يجب توفير المصاعد في مراكز تأهيل األشخاص ذوي اإلعاقة العقلية واالعاقات الحركية ، و
                                        مراكز تأهيل ذوي االعاقات المتعددة </li>
                                    <li className="unordered-list-item">  توفر كافة الشروط الصحية و الفنية في التمديدات الصحية بما يمنع حدوث تلوث أو اختالط
                                        مجاري الصرف الصحي الخارجية </li>
                                    <li className="unordered-list-item"> مراعاة تناسب غرف و صاالت و مرافق المبنى من حيث المساحة و األعداد مع الطاقة
                                        االستيعابية </li>
                                    <li className="unordered-list-item">   طريقة حساب الطاقة االستيعابية: )مساحة مسطح البناء المذكور في رخصة البناء – مساحة
                                        القبو(/10؛ الناتج يكون اجمالي الطاقة االستيعابية للمركز شريطة التزام صاحب المركز بتوفير
                                        االشتراطات التالية :</li>
                                    <li className="unordered-list-item">  الفصول التأهيلية )فصل لكل 8 مستفيدين من ذوي اإلعاقة بحيث ال تقل مساحة الفصل الواحد
                                        عن 40 م2 ) </li>
                                    <li className="unordered-list-item">  دورات مياه لألشخاص ذوي اإلعاقة تتناسب مع أعمار المستفيدين و احتياجاتهم )دورة مياه لكل
                                        10 أشخاص بحيث ال تقل المساحة لكل دورة مياه عن 15.3 م2 )و يتم توزيع دورات المياه بما
                                        يخدم المستفيدين </li>
                                    <li className="unordered-list-item">  غرف مصادر للتأهيل و التدريب )غرفه لكل 30 مستفيد و مساحتها ال تقل عن 32م2 ) </li>
                                    <li className="unordered-list-item">   غرف للتربيه الفنية و المهنية )غرفه لكل 30 مستفيد و مساحتها ال تقل عن 32م2 </li>
                                    <li className="unordered-list-item"> غرف متعددة النشاطات و تستخدم في التوجيه و االرشاد األسري )غرفه لكل 30 مستفيد و
                                        مساحتها ال تقل عن 32م2 )  </li>
                                    <li className="unordered-list-item">   مساحة المرافق الخدمية تصل الى 10 %من مساحة مسطح البناء</li>
                                    <li className="unordered-list-item">  مساحة خارجية للعب تحسب مساحتها على النحو التالي )2.2م2 لكل مستفيد( </li>
                                    <li className="unordered-list-item">  في حال ت قديم الخدمات الصحية يجب مراعاة الحصول على ترخيص من وزارة الصحة لتقديم
                                        الخدمات الصحية مع توفير مرفق خاص بالخدمات الصحية والتأهيل الطبي )10 %من مساحة
                                        مسطح البناء( مع وجود مدخل مستقل من الشارع للمرفق الصحي؛ يمكن للمركز االستغناء عن
                                        ترخيص وزارة الصحة في حال توقيع عقد شراكة مع منشأه مرخصة من وزارة الصحة لتقديم
                                        الخدمات الصحية مع ضرورة االلتزام باشتراطات وزارة الصحة المتعلقة بالمرفق الصحي . </li>

                                    <li className="unordered-list-item">  وجود مواقف مخصصة للكوادر و المراجعين بحيث يتوفر مواقف مخصصة لذوي اإلعاقة واحد
                                        لكل 20 حالة </li>
                                    <li className="unordered-list-item">  </li>
                                </ul>
                            </li>
                            <li className="ordered-list-item">  أن يكون أثاث المبنى ذا جودة عالية و يحقق سالمة المستفيد و ال يشكل خطر عليه </li>
                            <li className="ordered-list-item"> وجود كاميرات مراقبة شاملة لجميع المرافق و الممرات و الساحات لمراقبة سالمة المستفيد مع أهمية
                                االحتفاظ بالتسجيالت لمدة مئة و ثمانين يوما على األقل و أن تكون سجالت المراقبة لألقسام النسائية لدى
                                القسم النسائي  </li>

                            <li className="ordered-list-item">  وجود نظام الكتروني داخلي في المركز لتسجيل المستفيدين و حفظ ملفاتهم و لمتابعة الخطط التأهيلية و
                                تطور الحالة  </li>

                            <li className="ordered-list-item"> توقيع المالك على تعهد بعدم استقبال المستفيدين و تأهيلهم اال بعد الحصول على الترخيص النهائي  </li>

                            <li className="ordered-list-item">  الحصول على الترخيص المؤقت ال يعني تأكيد حصول على الترخيص النهائي، حيث أن الترخيص النهائي
                                مرتبط بتوفر كافة اشتراطات البنية التحتية </li>

                            <li className="ordered-list-item">  أن مدة الترخيص المؤقت سنة واحدة فقط و تلغى تلقائيا بعد انتهاء الفترة و ال تملك الوزارة صالحية
                                االستثناء للتمديد و يمكن للمالك إعادة التقديم على الترخيص الؤقت والبدأ من جديد </li>

                            <li className="ordered-list-item">حصولك على الترخيص المؤقت او النهائي ال يضمن حصولك على دعم الدولة للرسوم    </li>

                            <li className="ordered-list-item"> في حال الرغبة الحصول على الدعم فيجب التقديم على برنامج دعم الدولة للرسوم بشكل مستقل بعد استيفاء
                                الشروط الخاصة بها  </li>
                        </ol>
                    </div>
                </div>

                <Field name="agree" mt={3}>
                    {({ meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                            <FormControlLabel
                                label="انا اقر واتعهد بالالتزام بالشروط والاحكام الواردة والمتعلقه بالطلب"
                                control={
                                    <Field
                                        name="agree"
                                        component={Checkbox}
                                        type="checkbox"
                                        // value={!!values.agree[0]}
                                        checked={false}
                                        onClick={() => {
                                            // setField("agree", values.agree ? [] : [true]);
                                            setIsAgree(!isAgree)
                                        }}
                                    />
                                }
                            />
                        </FormControl>
                    )}
                </Field>
            </Grid>
        </>
    )
}

export default Terms;

Terms.propTypes = {
    setField: PropTypes.func
};
