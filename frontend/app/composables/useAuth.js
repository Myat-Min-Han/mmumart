export const useAuth = () => {
  const token = useState('jwt', () => null) 
  const user = useState('user', () => null)

  const tokenCookie = useCookie('jwt')

  if (tokenCookie.value && !token.value) {
    token.value = tokenCookie.value
  }

  const setAuth = (newToken, newUser = null) => {
    token.value = newToken
    tokenCookie.value = newToken
    if (newUser) {
      user.value = newUser
    }
  }

  const setUser = (newUser) => {
    user.value = newUser
  }

  const clearAuth = () => {
    token.value = null
    tokenCookie.value = null
    user.value = null
  }

  return { token, user, setAuth, setUser, clearAuth }
}
