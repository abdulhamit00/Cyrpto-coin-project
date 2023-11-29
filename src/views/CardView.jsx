import millify from "millify";
import { useNavigate } from "react-router-dom";

const CardView = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/coin/${data.id}`)}
      className=" cardd d-flex flex-column justify-content-around border rounded p-3 "
    >
      <div>
        <div>
          <h3>{data.name}</h3>
          <h6>{data.symbol}</h6>
          <p>${Number(data.priceUsd).toFixed(2)}</p>
        </div>
        <p className={data.changePercent24Hr >= 0 ? "up" : "down"}>
          {" "}
          % {millify(data.changePercent24Hr)}{" "}
        </p>
      </div>
    </div>
  );
};

export default CardView;
