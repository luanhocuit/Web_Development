function Button({

    text,

    type = "button",

    onClick,

    disabled = false,

    icon = null

}) {

    return (

        <button

            className="main-btn"

            type={type}

            onClick={onClick}

            disabled={disabled}

        >

            {icon && <span className="btn-icon">{icon}</span>}

            {text}

        </button>

    );

}

export default Button;