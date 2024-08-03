import {useState} from 'react'
import {Input} from '../ui'
import { useDispatch, useSelector} from 'react-redux'
import {signUserFailure, signUserStart, signUserSuccess} from '../slice/auth'
import AuthService from '../service/auth'
import ValidationError from './validation-error'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading, error} = useSelector((state) => state.auth)

  const registerHandler = async e => {
    e.preventDefault()
  

    dispatch(signUserStart())
    const user = {
      username: name,
      email,
      password,

    }
    if (password.length >= 8) {
      
      try {
        const response = await AuthService.userRegister(user)
        dispatch(signUserSuccess(response.user))
        console.log(response.user)
      } catch (error) {
        dispatch(signUserFailure(error.response.data.errors))
        console.error(error?.response?.data?.error)
      }
    }
    else{
      dispatch(signUserFailure({
        password: ['should be at least 8 characters']
      }) 
       
      )
    }
  }

  return (
    <div className='text-center'>
      <main className="form-signin w-25 m-auto">
        <form onSubmit={registerHandler}>
          <img className="mb-4" src="/src/assets/Untitled design (1).png" alt="picture" width="65" height="60"/>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <ValidationError errors={error} />
          <Input label={'userName'} state={name} setState={setName}/>
          <Input label={'Email address'} state={email} setState={setEmail}/>
          <Input label={'Password'} type='password' state={password} setState={setPassword}/>
          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" disabled={isLoading} type="submit">{isLoading ? "loading..." : 'register'}</button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
        </form>
      </main>
    </div>
  )
}

export default Register
