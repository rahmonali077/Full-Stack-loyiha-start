import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
      <Link to="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
        <img src="/src/assets/Untitled design (1).png" alt="Bootstrap" width="80" height="70" className="me-3" />
        <span className="fs-4">Floral Grove</span>
      </Link>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <Link className='me-3 py-2 link-body-emphasis text-decoration-none' to={'/Register'}>Register</Link>
        <Link className='me-3 py-2 link-body-emphasis text-decoration-none' to={'/Login'}>Login</Link>
      </nav>
    </div>
  )
}

export default Navbar
