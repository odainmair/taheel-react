import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز اصدار ترخيص مؤقت لمركز تأهيل أهلي',
    media: '/static/images/products/clock.png',
    title: 'اصدار ترخيص مؤقت لمركز تأهيل أهلي',
    url: '/services/templicense',
    isActive: true
  },
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز اصدار ترخيص نهائي لمركز تأهيل أهلي',
    media: '/static/images/products/app.png',
    title: 'اصدار ترخيص نهائي لمركز تأهيل أهلي',
    url: '/services/finallicense',
    isActive: true
  },
  {
    id: uuid(),
    description: 'طلب تجديد رخصة نهائية',
    media: '/static/images/products/renew.png',
    title: 'طلب تجديد رخصة نهائية',
    url: '/services/finallicenserenewal',
    isActive: true
  },
  {
    id: uuid(),
    description: 'تتيح هذه الخدمة للمركز تقييم جاهزيته',
    media: '/static/images/products/checklist.png',
    title: 'نقل مقر مركز أهلي',
    url: '/services/transfercenter',
    isActive: true
  },
  {
    id: uuid(),
    description: 'تتيح هذه الخدمة للمركز الانضمام لبرنامج تحمل الدولة للرسوم',
    media: '/static/images/products/help_hand.png',
    title: 'برنامج تحمل الدولة للرسوم',
    url: '/services/survey',
    isActive: false
  },
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز اصدار ترخيص نهائي لمركز تأهيل أهلي',
    media: '/static/images/products/app.png',
    title: 'اصدار ترخيص نهائي لمركز تأهيل أهلي',
    url: '/services/finallicense',
    isActive: false
  },
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز اصدار ترخيص مؤقت لمركز تأهيل أهلي',
    media: '/static/images/products/checklist.png',
    title: 'اصدار ترخيص مؤقت لمركز تأهيل أهلي',
    url: '/services/survey',
    isActive: false
  },
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز اصدار ترخيص مؤقت لمركز تأهيل أهلي',
    media: '/static/images/products/checklist.png',
    title: 'اصدار ترخيص مؤقت لمركز تأهيل أهلي',
    url: '/services/survey',
    isActive: false
  }
];
