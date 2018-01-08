import React from 'react';
import { Admin, Resource, Delete, fetchUtils } from 'admin-on-rest';

import { PostList, PostEdit, PostCreate } from './PostList';
import { UserList, UserEdit, UserCreate, UserShow } from './UserList';
import { RoleList, RoleEdit, RoleCreate } from './RoleList';
import { CategoryList, CategoryEdit, CategoryCreate } from './CategoryList';
import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';
import CategoryIcon from 'material-ui/svg-icons/action/bookmark';
import RoleIcon from 'material-ui/svg-icons/image/filter-tilt-shift';


import Dashboard from './Dashboard';
import authClient from './authClient';
import simpleRestClient from './simpleRestClient'

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({
            Accept: 'application/json',
        });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}
const restClient = simpleRestClient('http://localhost:9292/api', httpClient);

// restClient={restClient} 
const App = () => (
    <Admin authClient={authClient} restClient={restClient} dashboard={Dashboard}>
        <Resource name="posts" options={{ label: 'Posts' }} icon={PostIcon} list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} />
        <Resource name="users" options={{ label: 'Users' }} icon={UserIcon} list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} remove={Delete} />
        <Resource name="categories" options={{ label: 'Categories' }} icon={CategoryIcon} list={CategoryList} edit={CategoryEdit} create={CategoryCreate} remove={Delete} />
        <Resource name="roles" options={{ label: 'Roles' }} icon={RoleIcon} list={RoleList} edit={RoleEdit} create={RoleCreate} remove={Delete} />
    </Admin>
);





//  edit={PostEdit} create={PostCreate} remove={Delete} 
export default App;
