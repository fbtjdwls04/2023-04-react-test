import React, { useEffect, useState, useCallback, useMemo } from "react";

function OrderMainFood({ mainFoodCount, SetMainFoodCount }) {
  return (
    <>
      <h2>메인 (수량 : {mainFoodCount})</h2>
      <div>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => SetMainFoodCount(mainFoodCount + 1)}
        >
          증가
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() =>
            SetMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)
          }
        >
          감소
        </button>
      </div>
    </>
  );
}

const MemoizedOrderMainFood = React.memo(OrderMainFood);

function OrderOptions({
  selectiedCount,
  options,
  toggleAllChecked,
  toggleOptionCheck,
  btnAllChecked,
  optionCheckeds,
}) {
  return (
    <>
      <h2>
        옵션 ( {selectiedCount} / {options.length} )
      </h2>
      <label>
        <input
          type="checkbox"
          checked={btnAllChecked}
          onChange={toggleAllChecked}
        />
        전체 선택
      </label>
      <ul>
        {options.map((option, index) => (
          <li style={{ userSelect: "none", cursor: "pointer" }} key={option}>
            <label>
              <input
                type="checkbox"
                checked={optionCheckeds[index]}
                onChange={() => toggleOptionCheck(index)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

const MemoizedOrderOptions = React.memo(OrderOptions);

function OrderDelivery({ deliveryType, SetDeliveryType }) {
  return (
    <>
      <h2>배달옵션</h2>
      <label>
        <input
          type="radio"
          name="delivery-type"
          checked={deliveryType == "직접수령"}
          onChange={() => SetDeliveryType("직접수령")}
        />
        직접수령
      </label>
      <label>
        <input
          type="radio"
          name="delivery-type"
          checked={deliveryType == "배달"}
          onChange={() => SetDeliveryType("배달")}
        />
        배달
      </label>
    </>
  );
}

const MemoizedOrderDelivery = React.memo(OrderDelivery);

export default function Order() {
  const [mainFoodCount, SetMainFoodCount] = useState(1);

  const options = [
    "사이다 1.5",
    "랜치 소스",
    "머스타드 소스",
    "마라 소스",
    "스윗 칠리 소스",
    "레모네이드",
  ];

  const [optionCheckeds, SetOptionCheckeds] = useState(
    new Array(options.length).fill(false)
  );

  const toggleOptionCheck = useCallback(
    (index) => {
      const newOptionCheckeds = optionCheckeds.map((el, _index) =>
        index == _index ? !el : el
      );
      SetOptionCheckeds(newOptionCheckeds);
    },
    [optionCheckeds]
  );

  const btnAllChecked = useMemo(
    () => optionCheckeds.every((el) => el),
    [optionCheckeds]
  );
  const selectiedCount = useMemo(
    () => optionCheckeds.filter((el) => el).length,
    [optionCheckeds]
  );

  const toggleAllChecked = useCallback(() => {
    if (btnAllChecked) {
      //전부 체크를 헤제 해야함
      SetOptionCheckeds(optionCheckeds.map((el) => false));
    } else {
      // 전부 체크를 해야함
      SetOptionCheckeds(optionCheckeds.map((el) => true));
    }
  }, [optionCheckeds]);

  const [deliveryType, SetDeliveryType] = useState("직접수령");

  return (
    <>
      <h1>음식주문</h1>

      <MemoizedOrderMainFood
        SetMainFoodCount={SetMainFoodCount}
        mainFoodCount={mainFoodCount}
      />

      <MemoizedOrderOptions
        selectiedCount={selectiedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        toggleOptionCheck={toggleOptionCheck}
        btnAllChecked={btnAllChecked}
        optionCheckeds={optionCheckeds}
      />
      <MemoizedOrderDelivery
        deliveryType={deliveryType}
        SetDeliveryType={SetDeliveryType}
      />
    </>
  );
}
