function InputField({

    icon,

    type = "text",

    placeholder,

    value,

    onChange,

    name,

    children,

    disabled = false

}) {

    return (

        <div className="input-box">

            <span className="icon">

                {icon}

            </span>

            <input

                type={type}

                name={name}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

                disabled={disabled}

            />

            {children}

        </div>

    );

}

export default InputField;