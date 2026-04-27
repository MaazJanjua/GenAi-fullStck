import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from '../services/auth.api'

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context
    // const [loading, setLoading] = useState(true);


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return data
        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (error) {
            console.log(error);
            throw error
        } finally {

            setLoading(false)
        }
    }
    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (error) {

        } finally {

            setLoading(false)
        }

    }


    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (error) {
                setUser(null)
            } finally {

                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleLogin, handleRegister, handleLogout }

}