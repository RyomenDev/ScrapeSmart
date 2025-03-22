import PropTypes from "prop-types";
import WarningIcon from "../assets/Warning.svg";

const ErrorDisplay = ({ error }) => {
  return error ? (
    <div className="flex items-center text-red-500 text">
      <img src={WarningIcon} alt="warning" className="w-4 h-4 mr-1 " />
      <span>{error}</span>
    </div>
  ) : null;
};

ErrorDisplay.propTypes = {
  error: PropTypes.string,
};

export default ErrorDisplay;
