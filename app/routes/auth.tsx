import {usePuterStore} from "~/lib/puter";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get('next') || '/';
    const mode = searchParams.get('mode') || 'signin';
    const navigate = useNavigate();

    const [authMode, setAuthMode] = useState<'signin' | 'signup'>(mode === 'signup' ? 'signup' : 'signin');

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    }

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>{authMode === 'signin' ? 'Welcome Back' : 'Create Account'}</h1>
                        <h2>
                            {authMode === 'signin' 
                                ? 'Log In to Continue Your Job Journey' 
                                : 'Sign Up to Start Your Job Journey'}
                        </h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Please wait...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>{authMode === 'signin' ? 'Log In' : 'Sign Up'}</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">
                            {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                            <button 
                                onClick={toggleAuthMode}
                                className="text-blue-600 font-medium ml-2"
                            >
                                {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth