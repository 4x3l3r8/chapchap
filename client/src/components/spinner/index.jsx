import { tw } from "brise";
import { ImSpinner9 } from "react-icons/im";
import "./style.css";

const SpinnerIcon = tw(ImSpinner9)`
  mr-4
  top-3
  animate-spin
`;

const Spinner = () => {
  return <SpinnerIcon />;
};

export default Spinner;
