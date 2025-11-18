export function validateEmail(email) {
    // Standard email format
    const regex = /^(?=.{1,254}$)(([^<>()[\]\\.,;:\s@"]{1,64}(\.[^<>()[\]\\.,;:\s@"]{1,64})*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // Min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, no 3 identical consecutive chars
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1).{8,32}$/;
    return regex.test(String(password));
}