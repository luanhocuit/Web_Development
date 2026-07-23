import "./../styles/profile.css";

function StatsCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div
            className="stats-card"
            style={{
                borderTop: `5px solid ${color}`
            }}
        >

            <div className="stats-header">

                <div
                    className="stats-icon"
                    style={{
                        background: color
                    }}
                >

                    {icon}

                </div>

            </div>

            <h4>

                {title}

            </h4>

            <h2>

                {value}

            </h2>

        </div>

    );

}

export default StatsCard;