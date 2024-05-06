export default function logout() {
    localStorage.removeItem('token'); // remove the token from local storage
    window.location.href = '/login'; // redirect to login
}