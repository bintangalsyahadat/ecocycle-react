import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export async function doCreateUserWithEmailAndPassword(username, email, password) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCred.user, {
        displayName: username
    });

    return userCred.user;
}

export const doSignINWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async (email, password) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result
}

export const doSIgnOut = () => {
    return auth.signOut();
}

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// }

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// }

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/dashboard`
//     });
// }

