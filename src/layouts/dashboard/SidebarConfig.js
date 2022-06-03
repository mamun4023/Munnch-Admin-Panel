// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill')
  // },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('fa6-solid:users-line')
  },
  {
    title: 'merchant',
    path: '/dashboard/merchant',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'banner',
    path: '/dashboard/banner',
    icon: getIcon('ph:flag-banner-fill')
  },
  {
    title: 'food',
    path: '/dashboard/food',
    icon: getIcon('emojione-monotone:pot-of-food')
  },
  {
    title: 'cuisine',
    path: '/dashboard/cuisine',
    icon: getIcon('dashicons:food')
  },
  {
    title: 'Order',
    path: '/dashboard/order',
    icon: getIcon('entypo:shopping-cart')
  },
  {
    title: 'Strings',
    path: '/dashboard/string',
    icon: getIcon('ic:sharp-policy')
  },
  {
    title: 'Bank',
    path: '/dashboard/bank',
    icon: getIcon('bxs:bank')
  },
  {
    title: 'Coupon',
    path: '/dashboard/coupon',
    icon: getIcon('ri:coupon-2-fill')
  },
  {
    title: 'Withdrawal',
    path: '/dashboard/withdrawal',
    icon: getIcon('bx:money-withdraw')
  },
  {
    title: 'Transaction',
    path: '/dashboard/transaction_history',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'Notify',
    path: '/dashboard/notify',
    icon: getIcon('ic:baseline-notification-add')
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: getIcon('clarity:settings-solid')
  },
  // {
  //   title: 'Loyalty',
  //   path: '/dashboard/loyalty',
  //   icon: getIcon('ic:baseline-loyalty')
  // },
  
  {
    title: 'Report',
    path: '/dashboard/report',
    icon: getIcon('carbon:analytics')
  },

  // {
  //   title: 'Delivery Fee',
  //   path: '/dashboard/delivery_fee',
  //   icon: getIcon('mdi:truck-delivery')
  // },

  {
    title: 'Contact Us',
    path: '/dashboard/contact',
    icon: getIcon('ic:round-contact-phone')
  }
];

export default sidebarConfig;
