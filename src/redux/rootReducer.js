import {combineReducers} from 'redux';

// auth Reducers
import SignInReducer from './auth/signIn/reducer';
import ProfileReducer from './auth/profile/profile/reducer';
import ChangePasswordReducer from './auth/profile/changePassword/reducer';

// user reducer
import FetchUserRedcuer from './user/fetch/reducer';

// food Reducers
import FetchAllFoodListReducer from './food/fetchAll/reducer';
import FetchSingleFoodListReducer from './food/fetchSingle/reducer';

// cusine Reducer 
import FetchCuisineListReducer from './cuisine/fetchAll/reducer';
import FetchSingleReducer from './cuisine/fetchSingle/reducer';

// Merchant Reducer 
import FetchMerchantListReducer from './merchant/fetchAll/reducer';
import FetchSingleMerchantReducer from './merchant/fetchSingle/reducer';
import AddMerchantReducer from './merchant/add/reducer';
import UpdateMerchantReducer from './merchant/update/reducer';

// Banner Reducer 
import FetchBannerListReducer from './banner/fetchAll/reducer';
import FetchSingleBannerReducer from './banner/fetchSingle/reducer';
import UpdateBannerReducer from './banner/update/reducer';

// notification
import FetchNotificationListReducer from './notify/fetchAll/reducer';

// merchant menu
import FetchAllMenuReducer from './menu/fetchAll/reducer';
import FetchSingleMenuReducer from './menu/fetchSingle/reducer';
import AddMenuReducer from './menu/add/reducer';

// Bank
import FetchBankListReducer from './bank/fetchAll/reducer';
import FetchSingleBankReducer from './bank/fetchSingle/reducer';

import FetchDeliveryFeeListReducer from './deliveryFee/fetchAll/reducer';
import FetchSingleFeeReducer from './deliveryFee/fetchSingle/reducer';

import FetchCouponListReducer from './coupon/fetchAll/reducer';
import FetchSingleCoupon from './coupon/fetchSingle/reducer';

import FetchWithdrawal from './withdraw/fetchAll/reducer';
import UserTransactionHistory from './transactionHistory/User/reducer';
import MerchantTransactionHistory from './transactionHistory/merchant/reducer';
import ContactListReducer from './contact/fetchAll/reducer';

import OrderListReducer from './order/FetchAllOrder/reducer';
import SingleOrderReducer from './order/fetchSingle/reducer';

import TotalReducer from './report/fetchTotal/reducer';
import Top5CuisineReducer from './report/fetchTopCuisine/reducer';
import GrowthChartReducer from './report/fetchGrowth/reducer';
import OrderTimelineReducer from './report/fetchOrderTimeline/reducer';
import OrderGrowthReducer from './report/fetchOrderGrowth/reducer';

const RootReducer = combineReducers({
    SignIn : SignInReducer,
    Profile : ProfileReducer,
    ChangePassword : ChangePasswordReducer,
    FetchUsers : FetchUserRedcuer,

    // food reducer
    FetchFoodList : FetchAllFoodListReducer,
    FetchSingleFoodList : FetchSingleFoodListReducer,

    //Cuisine Reducer
    FetchCuisineList : FetchCuisineListReducer,
    FetchSingleCusineList : FetchSingleReducer,

    //Merchant Reducer 
    FetchMerchantList : FetchMerchantListReducer,
    FetchSingleMerchant : FetchSingleMerchantReducer,
    AddMerchant  : AddMerchantReducer,
    UpdateMerchant : UpdateMerchantReducer,

    //Merchant Reducer 
    FetchBannerList : FetchBannerListReducer,
    FetchSingleBanner : FetchSingleBannerReducer,
    UpdateBanner : UpdateBannerReducer,

     //Notify Reducer 
    FetchNotificationList : FetchNotificationListReducer,

     // menu 
    FetchAllMenu : FetchAllMenuReducer,
    FetchSingle : FetchSingleMenuReducer,
    AddMenu : AddMenuReducer,

    FetchBankList : FetchBankListReducer,
    FetchSingleBank : FetchSingleBankReducer,

    DeliveryFee : FetchDeliveryFeeListReducer,
    singleFee : FetchSingleFeeReducer,

    CouponList : FetchCouponListReducer,
    SingleCoupon : FetchSingleCoupon,

    Withdrawal : FetchWithdrawal,
    UserTransaction : UserTransactionHistory,
    MerchantTransaction : MerchantTransactionHistory,

    OrderList : OrderListReducer,
    SingleOrder : SingleOrderReducer,
    ContactList : ContactListReducer,
    Total : TotalReducer,
    Top5Cuisine : Top5CuisineReducer,
    GrowthChart : GrowthChartReducer,
    OrderTimeline : OrderTimelineReducer,
    OrderGrowth: OrderGrowthReducer,
})

export default RootReducer;