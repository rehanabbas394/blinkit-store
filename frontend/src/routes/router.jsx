import { createBrowserRouter} from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/home';
import { SearchPage } from '../pages/SearchPage'
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { ForgotPassword } from '../pages/forgot-password';


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
            }
        ]
    }
])


export default router