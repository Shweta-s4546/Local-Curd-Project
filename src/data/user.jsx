import {toast} from "react-toastify"

//initail data
const users = JSON.parse(localStorage.getItem("users")) || [];

//regiter
const registerUser = async (user) => {
    console.log('register=', user);

    const extEmail = users.find((item) => item.email === user.email);
    const extMobile = users.find((item) => item.mobile === user.mobile);

    if(extEmail){
        toast.warning(`${user.email} already exits`)
    }else if(extMobile) {
        toast.warning(`${user.mobile} already exist`)
    }else{
            users.push(user);
            saveUser(users);
            toast.success(`Hi , ${user.name} you have register successfully`);
             window.location.href="/login";
        }

};

const saveUser = (data) =>{
    localStorage.setItem("users", JSON.stringify(data));
}

//login logic
const loginUser = async (user) => {
    const extUser = users.find((item) => item.email === user.email)
        if(!extUser){
            toast.warning(`${user.email} doesn't exist.`)
        }else{
            if(extUser.password === user.password) {
                localStorage.setItem("loginStatus", true);
                toast.success('user login success');
                window.location.href = "/";
            }else{
                toast.warning('password are not matched');
            }
        }
}

//logout logic
const logoutUser = async () => {
    if(localStorage.getItem('loginStatus') =="true") {
        localStorage.removeItem('loginStatus');
        toast.success('successfully logout');
        window.location.href ="/" ;
    }
}

export { registerUser, loginUser, logoutUser} //const export