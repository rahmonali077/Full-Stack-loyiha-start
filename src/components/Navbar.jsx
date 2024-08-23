import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeItem } from '../helpers/persistence-storage'
import { logoutUser } from '../slice/auth'

const Navbar = () => {
  const {loggedIn, user} = useSelector(state => state.auth)
  const navigation = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
    removeItem('token')
    navigation('/login')
  }
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
      <Link to="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
        <img src="/src/assets/Untitled design (1).png" alt="Bootstrap" width="80" height="70" className="me-3" />
        <span className="fs-4">Floral Grove</span>
      </Link>
      

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {loggedIn ? (
          <>
            <p className='me-3 py-2 m-0 link-body-emphasis text-decoration-none'>{user.username}</p>
            <Link className='me-3 py-2 link-body-emphasis text-decoration-none' to={'/create-article'}>
            Create
            </Link>
            <button className='btn btn-outline-danger' onClick={logoutHandler}>Logout</button>
          </>
        ) : ( 
          <>
          <Link className='me-3 py-2 link-body-emphasis text-decoration-none' to={'/Register'}>Register</Link>
            <Link className='me-3 py-2 link-body-emphasis text-decoration-none' to={'/Login'}>Login</Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default Navbar
