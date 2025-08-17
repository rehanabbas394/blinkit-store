import { createBrowserRouter} from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/home';
import { SearchPage } from '../pages/SearchPage'
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';


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
            }
        ]
    }
])


export default router