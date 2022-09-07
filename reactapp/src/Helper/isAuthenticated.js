import Cookies from 'universal-cookie';
const isAuthenticated = () => {
    const cookies=new Cookies();
    const StoredCookiee=cookies.get('access_token');
    if(StoredCookiee===""){
        return false;
    }
    return true;
};

export default isAuthenticated;