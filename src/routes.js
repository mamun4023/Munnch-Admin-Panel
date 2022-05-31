import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFound from './pages/Page404';
// pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import Merchant from './pages/Merchant';
import CreateMerchant from './sections/@dashboard/merchant/create';
import ViewMerchant from './sections/@dashboard/merchant/view';
import UpdateMerchant from './sections/@dashboard/merchant/Update';
import MenuItem from './pages/MenuItem';
import CreateMenuItem from './sections/@dashboard/menuItem/create';
import ViewMenuItem from './sections/@dashboard/menuItem/view';
import UpdateItem from './sections/@dashboard/menuItem/update';
import UploadImage from './sections/@dashboard/menuItem/image';
import Withdrawal from './pages/Withdrawal';
import MerchantWithdraw from './sections/@dashboard/withdrawal/merchant';
import UserWithdraw from './sections/@dashboard/withdrawal/user';
import Notification from './pages/Notify';
import CreateNotification from './sections/@dashboard/notify/create';
import UpdateNotification from './sections/@dashboard/notify/update';
import Coupon from './pages/Coupon';
import CreateCoupon from './sections/@dashboard/coupon/create';
import UpdateCoupon from './sections/@dashboard/coupon/update';
import Banner from './pages/Banner';
import BannerCreate from './sections/@dashboard/banner/create';
import BannerView from './sections/@dashboard/banner/view';
import BannerUpdate from './sections/@dashboard/banner/update';

import Food from './pages/Food';
import CreateFood from './sections/@dashboard/Food/create';
import UpdateFood from './sections/@dashboard/Food/update';
import Cuisine from './pages/Cuisine';
import CreateCuisine from './sections/@dashboard/Cuisine/create';
import UpdateCuisine from './sections/@dashboard/Cuisine/update';
import Order from './pages/Order';
import ViewOrder from './sections/@dashboard/order/View';
import Strings from './pages/String';
import MerchantString from './sections/@dashboard/strings/merchant';
import UserString from './sections/@dashboard/strings/user';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UpdateSettings from './sections/@dashboard/settings/update';
import Loyalty from './pages/Loyalty';
import CreateLoyalty from './sections/@dashboard/loyalty/create';
import UpdateLoyalty from './sections/@dashboard/loyalty/update';
import Bank from './pages/Bank';
import AddBank from './sections/@dashboard/bank/create';
import UpdateBank from './sections/@dashboard/bank/update';
import TransactionHistory from './pages/TransactionHistory';
import Report from './pages/Report';
import DeliveryFee from './pages/DeliveryFee';
import AddRange from './sections/@dashboard/deliveryFee/create';
import UpdateRange from './sections/@dashboard/deliveryFee/update';
import ContactUs from './pages/Contact';
import ViewContact from './sections/@dashboard/contact/view';
import Store from './pages/store';
import UpdateStore from './sections/@dashboard/store/update'

// ----------------------------------------------------------------------

const token = localStorage.getItem('token');

export default function Router() {
  return useRoutes([
    token?
    {
      path: '/dashboard', element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'merchant', element : <Merchant/>},
        { path: 'merchant/create', element : <CreateMerchant/>},
        { path: 'merchant/view/:id', element : <ViewMerchant/>},
        { path: 'merchant/update/:id', element : <UpdateMerchant/>},
        { path: 'merchant/store/:id', element : <Store/>}, 
        { path: 'merchant/store/update/:id', element : <UpdateStore/>}, 

        { path: 'merchant/menu/:id', element : <MenuItem/>},
        { path: 'merchant/menu/create/:id', element : <CreateMenuItem/>},
        { path: 'merchant/menu/view/:id', element : <ViewMenuItem/>},
        { path: 'merchant/menu/image', element : <UploadImage/>},
        { path: 'merchant/menu/update/:id', element : <UpdateItem/>},
        
        { path: 'order', element : <Order/>},
        { path: 'order/view/:id', element : <ViewOrder/>},
        { path: 'banner', element : <Banner/>},
        { path: 'coupon', element : <Coupon/>},
        { path: 'coupon/create', element : <CreateCoupon/>},
        { path: 'coupon/update/:id', element : <UpdateCoupon/>},
        { path: 'notify', element : <Notification/>},
        { path: 'notify/create', element : <CreateNotification/>},
        { path: 'notify/update', element : <UpdateNotification/>},
        { path: 'withdrawal', element : <Withdrawal/>},
        { path: 'withdrawal/user', element : <UserWithdraw/>},
        { path: 'withdrawal/merchant', element : <MerchantWithdraw/>},
        { path: "string", element : <Strings/>},
        { path: "string/merchant", element : <MerchantString/>},
        { path: "string/user", element : <UserString/>},
        { path: "profile", element : <Profile/>},
        { path: "settings", element : <Settings/>},
        { path: "settings/update", element : <UpdateSettings/>},
        { path: 'banner/create', element : <BannerCreate/>},
        { path: 'banner/view/:id', element : <BannerView/>},
        { path: 'banner/update/:id', element : <BannerUpdate/>},
        { path: 'food', element : <Food/>},
        { path: 'food/create', element : <CreateFood/>},
        { path: 'food/update/:id', element : <UpdateFood/>},
        { path: 'cuisine', element : <Cuisine/>},
        { path: 'cuisine/create', element : <CreateCuisine/>},
        { path: 'cuisine/update/:id', element : <UpdateCuisine/>},
        { path: 'loyalty', element : <Loyalty/>},
        { path: 'loyalty/create', element : <CreateLoyalty/>},
        { path: 'loyalty/update', element : <UpdateLoyalty/>},
        { path: 'bank', element : <Bank/>},
        { path: 'bank/add', element : <AddBank/>},
        { path: 'bank/update/:id', element : <UpdateBank/>},
        { path: 'transaction_history', element : <TransactionHistory/>},
        { path: 'report', element : <Report/>},
        { path: 'delivery_fee', element : <DeliveryFee/>},
        { path: 'delivery_fee/add', element : <AddRange/>},
        { path: 'delivery_fee/update/:id', element : <UpdateRange/>},
        { path: 'contact', element : <ContactUs/>},
        { path: 'contact/view', element : <ViewContact/>},  
      

      ],
    }:
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/dashboard/user" replace /> }
  ]);
}