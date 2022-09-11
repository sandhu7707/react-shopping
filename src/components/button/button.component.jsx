import './button.styles.scss'

const BUTTON_TYPES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = (props) => {
  console.log(props);
  const { type, children, ...otherProps } = props;

  return (
    <button className={`${BUTTON_TYPES[type]} button-container`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;