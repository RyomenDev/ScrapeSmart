import PropTypes from "prop-types";
import ErrorDisplay from "./ErrorDisplay.jsx";

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
  Icon,
}) => (
  <div className="mb-2">
    <div className="flex items-center border-b-2 border-white mb-1">
      {Icon && <span className="text-gray-900 text-xl">{Icon}</span>}
      <div className="w-full relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-transparent text-gray-900 px-2 py-2 placeholder-slate-700 focus:outline-none ${
            error ? "border-red-500" : "border-gray-500"
          } transition`}
        />
      </div>
    </div>
    {/* {error && <p className="text-sm text-red-500 pl-5">{error}</p>} */}
    {error && <ErrorDisplay error={error} />}
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  Icon: PropTypes.node,
};

export default InputField;
