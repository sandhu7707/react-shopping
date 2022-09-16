import { useState }  from "react";
import { createUserDocumentOnEmailAndPasswordSignUp } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmit = async (event) => {
    if (password !== confirmPassword) {
      return;
    }
    event.preventDefault();
    try {
      const user = await createUserDocumentOnEmailAndPasswordSignUp(
        displayName,
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
    setFormFields(defaultFormFields);
  };

  return (
    <section>
      <h2>I do not have an account</h2>
      <h3>Sign Up with your email and password</h3>
      <form>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Re-enter Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        {confirmPassword !== password && (
          <p id="password-mismatch">! passwords dont match</p>
        )}

        <Button type="submit" onClick={onSubmit}>
          Sign Up
        </Button>
      </form>
    </section>
  );
};

export default SignUpForm;
