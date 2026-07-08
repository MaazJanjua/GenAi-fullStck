//logic {how forntend intract with backend/for communication withh backend}/bridge between forntend and backend


import axios from 'axios'
// import toast from "react-hot-toast"
const api = axios.create({
    baseURL: "https://genai-fullstck.onrender.com/",
    withCredentials: true
})

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        return response.data

    } catch (error) {
        console.log(error.response?.data);
        throw error
    }
}
// export async function login({ email, password }) {
//     try {
//         const response = await api.post('/api/auth/login', {
//             email,
//             password
//         })
//         return response.data
//     } catch (error) {
//         console.log(error);

//     }

// }
export async function login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password
        }, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(error.response?.data);
        throw error
    }
}

export async function logout() {

    try {
        const response = await api.get('/api/auth/logout')
        return response.data
    } catch (error) {
        console.log(error);

    }

}

export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data
    } catch (error) {
        console.log(error);

    }
}