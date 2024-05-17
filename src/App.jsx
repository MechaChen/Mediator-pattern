import { useEffect, useState, useMemo, useCallback } from "react";

import './App.css'

const apiGetStocks = () => Promise.resolve({
  'red|16G': 0,
  'red|32G': 3,
  'blue|16G': 6,
  'blue|32G': 1,
})

const useInputsMediator = (stocks) => {
  const [color, setColor] = useState('red');
  const [memory, setMemory] = useState('16G');
  const [quantity, setQuantity] = useState(0);
  const [hasEnoughtStock, setHasEnoughStock] = useState(true);

  const handleFieldChange = useCallback((e) => {
    const newValue = e.target.value;
    const curField = e.target.id;

    let curColor = color;
    let curMemory = memory;
    let curQuantity = quantity;

    const fieldSetters = {
      color: () => {
        curColor = newValue;
        setColor(newValue);
      },
      memory: () => {
        curMemory = newValue;
        setMemory(newValue);
      },
      quantity: () => {
        curQuantity = Number(newValue);
        setQuantity(Number(newValue));
      },
    }

    fieldSetters[curField]();

    const stock = stocks[`${curColor}|${curMemory}`];

    if (curQuantity > stock) {
      setHasEnoughStock(false);
    } else {
      setHasEnoughStock(true);
    }

  }, [color, memory, quantity, stocks]);

  return {
    color,
    memory,
    quantity,
    hasEnoughtStock,
    handleFieldChange,
  }
}

function App() {
  const [stocks, setStocks] = useState({});
  const inputMediator = useInputsMediator(stocks);

  useEffect(() => {
    apiGetStocks()
      .then((stocks) => {
        setStocks(stocks);
      })
  }, [])


  const handleColorChange = useCallback((e) => {
    inputMediator.handleFieldChange(e);
  }, []);


  const handleMemoryChange = useCallback((e) => {
    inputMediator.handleFieldChange(e);
  }, []);
  

  const handleQuantityChange = useCallback((e) => {
    inputMediator.handleFieldChange(e);
  }, []);


  return (
    <div className="App">
      <label>
        請選擇顏色：
        <select
          id="color"
          value={inputMediator.color}
          onChange={handleColorChange}
        >
          <option value="red">紅色</option>
          <option value="blue">藍色</option>
        </select>
      </label>

      <label>
        請選擇記憶體：
        <select
          id="memory"
          value={inputMediator.memory}
          onChange={handleMemoryChange}
        >
          <option value="16G">16G</option>
          <option value="32G">32G</option>
        </select>
      </label>

      <label>
        請輸入購買數量：
        <input
          id="quantity"
          type="number"
          value={inputMediator.quantity}
          onChange={handleQuantityChange}
        />
      </label>


      <span>您選擇了顏色：{inputMediator.color}</span>
      <span>您選擇了記憶體：{inputMediator.memory}</span>
      <span>您選擇了數量：{inputMediator.quantity}</span>

      <button disabled={!inputMediator.hasEnoughtStock}>
        {inputMediator.hasEnoughtStock
        ? '放入購物車'
        : '庫存不足'}
      </button>
    </div>
  );
}

export default App;
