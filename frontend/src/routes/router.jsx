import { createBrowserRouter} from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/home';
import { SearchPage } from '../pages/SearchPage'
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { ForgotPassword } from '../pages/forgot-password';
import { OtpVerfication } from '../pages/otp-verification';
import { ResetPassword } from '../pages/reset-password';
import UserMenuMobile from '../pages/userMenuMobile';
import Dashboard from '../layout/dashboard';
import Profile from '../pages/profile';
import MyOrders from '../pages/myOrders';
import Address from '../pages/address';
import Category from '../pages/category';
import SubCategory from '../pages/sub-category';
import AdminProducts from '../pages/productAdmin';
import AdminPerission from '../layout/AdminPermission';
import AddCategoryProduct from '../pages/addCategory';
import UploadProduct from '../pages/uploadProduct';
import ProductListPage from '../pages/productList';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/search",
                element: <SearchPage/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "/otp-verifiaction",
                element: <OtpVerfication/>
            },
            {
                path: "/reset-password",
                element: <ResetPassword/>
            },
            {
                path: "/user",
                element: <UserMenuMobile/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    {
                        path: "profile",
                        element: <Profile/>
                    },
                    {
                        path: "myorders",
                        element: <MyOrders/>
                    },
                    {
                        path: "address",
                        element: <Address/>
                    },
                    {
                        path: "category",
                        element: <AdminPerission><Category/></AdminPerission>
                    },
                    {
                        path: "sub-category",
                        element: <AdminPerission><SubCategory/></AdminPerission>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPerission> <UploadProduct/> </AdminPerission> 
                    },
                    {
                        path: "products",
                        element: <AdminProducts/>
                    }
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
        ]
    }
])


export default router