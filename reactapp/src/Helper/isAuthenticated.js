import Cookies from 'universal-cookie';
const isAuthenticated = () => {
    const cookies=new Cookies();
    const StoredCookie=cookies.get('access_token');
    return StoredCookie !== "";

};

export default isAuthenticated;