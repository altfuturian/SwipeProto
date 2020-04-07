const EMAIL_VERIFICATION = (email) => {
    let error = '';
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    
    if(!validEmailRegex.test(email)) {
        error = "Email not valid"
    }

    return error;
}

const PWD_VERIFICATION = (pwd) => {
    let error = '';

    if(pwd.length < 8) {
        error = "Password must consist 8 characters"
    }

    return error;
}

export default {
    EMAIL_VERIFICATION,
    PWD_VERIFICATION
}