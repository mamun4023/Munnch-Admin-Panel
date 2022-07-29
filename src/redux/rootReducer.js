import {combineReducers} from 'redux';
import SignInReducer from './auth/signIn/reducer';
import ProfileReducer from './auth/profile/profile/reducer';
import ChangePasswordReducer from './auth/profile/changePassword/reducer';
import FetchUserRedcuer from './user/fetch/reducer';
import FetchAllFoodListReducer from './food/fetchAll/reducer';
import FetchSingleFoodListReducer from './food/fetchSingle/reducer';
import FetchCuisineListReducer from './cuisine/fetchAll/reducer';
import FetchSingleReducer from './cuisine/fetchSingle/reducer';
import FetchMerchantListReducer from './merchant/fetchAll/reducer';
import FetchSingleMerchantReducer from './merchant/fetchSingle/reducer';
import UpdateMerchantReducer from './merchant/update/reducer';
import FetchBannerListReducer from './banner/fetchAll/reducer';
import FetchNotificationListReducer from './notify/fetchAll/reducer';
import FetchAllMenuReducer from './menu/fetchAll/reducer';
import FetchSingleMenuReducer from './menu/fetchSingle/reducer';
import AddMenuReducer from './menu/add/reducer';
import FetchBankListReducer from './bank/fetchAll/reducer';
import FetchSingleBankReducer from './bank/fetchSingle/reducer';
import FetchDeliveryFeeListReducer from './deliveryFee/fetchAll/reducer';
import FetchSingleFeeReducer from './deliveryFee/fetchSingle/reducer';
import FetchCouponListReducer from './coupon/fetchAll/reducer';
import FetchSingleCoupon from './coupon/fetchSingle/reducer';
import FetchWithdrawal from './withdraw/fetchAll/reducer';
import UserTransactionHistory from './transactionHistory/User/reducer';
import MerchantTransactionHistory from './transactionHistory/merchant/reducer';
import UserContactListReducer from './contact/user/fetchAll/reducer';
import MerchantContactListReducer from './contact/merchant/fetchAll/reducer';
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
    FetchFoodList : FetchAllFoodListReducer,
    FetchSingleFoodList : FetchSingleFoodListReducer,
    FetchCuisineList : FetchCuisineListReducer,
    FetchSingleCusineList : FetchSingleReducer,
    FetchMerchantList : FetchMerchantListReducer,
    FetchSingleMerchant : FetchSingleMerchantReducer,
    UpdateMerchant : UpdateMerchantReducer,
    FetchBannerList : FetchBannerListReducer,
    NotificationList : FetchNotificationListReducer,
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
    UserContactList : UserContactListReducer,
    MerchantContactList : MerchantContactListReducer,
    Total : TotalReducer,
    Top5Cuisine : Top5CuisineReducer,
    GrowthChart : GrowthChartReducer,
    OrderTimeline : OrderTimelineReducer,
    OrderGrowth: OrderGrowthReducer,
})

export default RootReducer;