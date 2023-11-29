import millify from "millify";
import React from "react";
import { BsCoin } from "react-icons/bs";
import LoadMoreController from "../controllers/LoadMoreController";
import CardView from "./CardView";
import { useNavigate } from "react-router-dom";

const MainPageView = ({ coins, popular }) => {
  const navigate = useNavigate();
  return (
    <div className="container-xl mt-5">
      <div className="d-flex ">
        <BsCoin className="fs-2 me-4 " />
        <h3>Hoşgeldiniz , Coin Listesi</h3>
      </div>
      <p className="lead mt-4">
        Coinmania, geleceğin finansal dönüşümüne liderlik etmek amacıyla yola
        çıkan yenilikçi bir kripto para projesidir. Blockchain teknolojisinin
        getirdiği fırsatları en iyi şekilde değerlendiren ekibimiz, şeffaf,
        güvenilir ve kullanıcı dostu bir finansal ekosistem oluşturma vizyonuyla
        hareket etmektedir.
      </p>
      <div className="d-flex gap-4 justify-content-around ">
        {/* popülerleri listele */}
        {popular?.map((i, id) => (
          <CardView key={id} data={i} />
        ))}
      </div>
      <table className="table table-dark  table-hover w-100 mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>coin</th>
            <th>market</th>
            <th>market hacmi</th>
            <th>değişim 24s</th>
            <th>%değişim(24s)</th>
          </tr>
        </thead>
        <tbody>
          {coins
            ? coins.map((coin, id) => (
                <tr onClick={() => navigate(`/coin/${coin.id}`)} key={id}>
                  <td>{id + 1}</td>
                  <td>
                    <span className="text-warning fw-bold me-2">
                      {coin.symbol}
                    </span>
                    <span className="text-nowrap text-truncate">
                      {coin.name}
                    </span>
                  </td>
                  <td>${millify(coin.priceUsd)}</td>
                  <td>${millify(coin.marketCapUsd)}</td>
                  <td>${millify(coin.volumeUsd24Hr)}</td>

                  <td className={coin.changePercent24Hr >= 0 ? "up" : "down"}>
                    {millify(coin.changePercent24Hr)}%
                  </td>
                </tr>
              ))
            : "yükleniyor..."}
        </tbody>
      </table>
      <LoadMoreController />
    </div>
  );
};

export default MainPageView;
