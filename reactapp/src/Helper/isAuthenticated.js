import Cookies from 'universal-cookie';
const isAuthenticated = () => {
    const cookies=new Cookies();
    const StoredCookie=cookies.get('access_token');
    if(StoredCookie===undefined || StoredCookie===""){
        return false;
    }
    return true;
};

export default isAuthenticated;