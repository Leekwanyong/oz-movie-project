function Input({ type = 'text', name, value, label, placeholder, error, ...props }) {
  return (
    <div className="flex flex-col justify-center  gap-2 ">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <input
        className=" w-full bg-transparent border outline-none ring-0 border-gray-500 focus:border-primary transition-all duration-500 px-4 py-3 rounded-md "
        type={type}
        value={value}
        name={name}
        id={name}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}

export default Input;
