import { doSignInWithGoogle } from '../../firebase/auth';

export default function AuthWithGoogle({ label, isSigningIn, setIsSigningIn }) {

    const onGoogleSignIn = async (e) => {
        e.preventDefault();

        if (isSigningIn) return;

        setIsSigningIn(true);

        try {
            await doSignInWithGoogle();
        } catch (err) {
            console.error(err);
            setIsSigningIn(false);
            return;
        }

        setIsSigningIn(false);
    };



    return (
        <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`flex items-center justify-center w-full py-4 mb-6 text-sm font-medium 
                rounded-2xl transition duration-300 cursor-pointer text-gray-900 
                ${isSigningIn ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"}
            `}
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