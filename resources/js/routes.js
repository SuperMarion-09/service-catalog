import Home from './views/admin/Home'
import Categories from './views/admin/categories/List'
import NotFound from './views/error/404';

export const routes = [{
    path: '/home',
    component: Home,

},
{
    path: '/categories',
    component: Categories,

},
{
    component: NotFound,
}
];