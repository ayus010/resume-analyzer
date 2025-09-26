import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter'

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className='navbar flex items-center justify-between'>
        <Link to="/">
            <p className='text-2xl font-bold text-gradient hover:scale-105 transition-transform'>RESUME ANALYZER</p>
        </Link>
        <div className="flex items-center gap-6">
          {auth.isAuthenticated ? (
            <>
              <Link to="/upload" className='primary-button w-fit hover:scale-105 transition-transform'>
                Upload Resume
              </Link>
              <Link to="/wipe" className='primary-button w-fit hover:scale-105 transition-transform'>
                Wipe Data
              </Link>
              <button onClick={auth.signOut} className='primary-button w-fit hover:scale-105 transition-transform'>
                Log Out
              </button>
            </>
          ) : (
            <button onClick={auth.signIn} className='primary-button w-fit hover:scale-105 transition-transform'>
              Sign In / Sign Up
            </button>
          )}
        </div>
    </nav>
  )
}

export default Navbar