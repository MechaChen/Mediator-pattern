import { useEffect, useState, useMemo, useCallback } from "react";

import './App.css'

const apiGetStocks = () => Promise.resolve({
  'red|16G': 0,
  'red|32G': 3,
  'blue|16G': 6,
  'blue|32G': 1,
})

function ThreeInputs() {
  const [color, setColor] = useState('red');
  const [memory, setMemory] = useState('16G');
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
    const stock = stocks[`${curColor}|${memory}`];

    if (quantity > stock) {
      setHasEnoughStock(false);
    } else {
      setHasEnoughStock(true);
    }
  }, [quantity]);


  const handleMemoryChange = useCallback((e) => {
    setQuantity(e.target.value)

    const curMemory = Number(e.target.value);
    const stock = stocks[`${color}|${curMemory}`];

    if (quantity > stock) {
      setHasEnoughStock(false);
    } else {
      setHasEnoughStock(true);
    }
  }, [color]);
  

  const handleQuantityChange = useCallback((e) => {
    setQuantity(e.target.value)

    const curQuantity = Number(e.target.value);
    const stock = stocks[`${color}|${memory}`];

    if (curQuantity > stock) {
      setHasEnoughStock(false);
    } else {
      setHasEnoughStock(true);
    }
  }, [color]);


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
        請選擇記憶體：
        <select
          value={color}
          onChange={handleMemoryChange}
        >
          <option value="16G">16G</option>
          <option value="32G">32G</option>
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
      <span>您選擇了記憶體：{memory}</span>
      <span>您選擇了數量：{quantity}</span>

      <button disabled={!hasEnoughtStock}>
        {hasEnoughtStock
        ? '放入購物車'
        : '庫存不足'}
      </button>
    </div>
  );
}

export default ThreeInputs;
