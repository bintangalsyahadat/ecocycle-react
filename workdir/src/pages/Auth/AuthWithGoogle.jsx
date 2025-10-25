import { doSignInWithGoogle } from '../../firebase/auth';

export default function AuthWithGoogle({ label, isSigningIn, setIsSigningIn }) {

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch((err) => {
                setIsSigningIn(false);
            });
        }
    };


    return (
        <button
            onClick={onGoogleSignIn}
            className="flex items-center cursor-pointer justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-100 hover:bg-gray-200"
        >
            <img
                className="h-5 mr-2"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                alt="Google"
            />
            {label} with Google
        </button>
    )
}