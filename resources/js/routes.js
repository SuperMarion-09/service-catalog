import Home from './views/admin/Home'
import Categories from './views/admin/categories/List'
import NotFound from './views/error/404';
import Signin from './views/auth/Signin';

export const routes = [{
    path: '/home',
    component: Home,
    auth:true,

},
{
    path: '/signin',
    component: Signin,
},
{
    path: '/categories',
    component: Categories,
    auth:true,

},
{
    component: NotFound,
}
];