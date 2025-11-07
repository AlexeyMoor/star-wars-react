const Button = ({children, callback, className}) => {
  return (
    <button
      onClick={callback ?? (() => {})}
      className={`text-center bg-red border-main border-1 px-2 py-1 rounded-md cursor-pointer transition transform hover:scale-105 hover:bg-red-500 hover:text-white ${className ?? ''}`}
    >
      {children}
    </button>
  );
};

export default Button;