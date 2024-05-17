import { useEffect, useState, useMemo, useCallback } from "react";

import './App.css'

const apiGetStocks = () => Promise.resolve({
  red: 3,
  blue: 6,
})

function TwoInputs() {
  const [color, setColor] = useState('red');
  const [quantity, setQuantity] = useState(0);
  const [stocks, setStocks] = useState({});
  const [hasEnoughtStock, setHasEnoughStock] = useState(true);

  useEffect(() => {
    apiGetStocks()
      .then((stocks) => {
        setStocks(stocks);
      })
  }, [])

  const handleColorChange = useCallback((e) => {
    setColor(e.target.value);

    const curColor = e.target.value;
    const stock = stocks[curColor];

    if (quantity > stock) {
      setHasEnoughStock(false);
    } else {
      setHasEnoughStock(true);
    }
  }, [quantity]);

  const handleQuantityChange = useCallback((e) => {
    setQuantity(e.target.value)

    const curQuantity = Number(e.target.value);
    const stock = stocks[color];

    if (curQuantity > stock) {
      setHasEnoughStock(false);
    } else {
      setHasEnoughStock(true);
    }
  }, [color])

  return (
    <div className="App">
      <label>
        請選擇顏色：
        <select
          value={color}
          onChange={handleColorChange}
        >
          <option value="red">紅色</option>
          <option value="blue">藍色</option>
        </select>
      </label>

      <label>
        請輸入購買數量：
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </label>


      <span>您選擇了顏色：{color}</span>
      <span>您選擇了數量：{quantity}</span>

      <button disabled={!hasEnoughtStock}>
        {hasEnoughtStock
        ? '放入購物車'
        : '庫存不足'}
      </button>
    </div>
  );
}

export default TwoInputs;
