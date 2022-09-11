import Button from "../../components/button/button.component";
import { useState } from "react";
import { 
    createUserDocumentFromAuth,
    signInWithEmail,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const{email, password} = formFields;

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(response.user);
    }

    const signInUser = async (event) => {
        event.preventDefault();
        console.log(`${email} ${password}`)
        try{
            const response = await signInWithEmail(email, password)
            console.log(response);
        }
        catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error);
            }
            console.error(error);
        }
    }

    const handleChange = (event) => {
        const {value, name} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <form>
                <FormInput 
                label="Email"
                type="email"
                onChange={handleChange}
                value={email}
                name="email"
                />
                <FormInput
                type="password"
                label="Password"
                onChange={handleChange}
                value={password}
                name="password"
                />
                <div className="buttons-container">
                    <Button onClick={signInUser}>Sign In</Button>
                    <Button type="google" onClick={logGoogleUser}>Gmail</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;