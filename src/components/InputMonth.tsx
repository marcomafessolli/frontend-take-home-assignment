import * as React from 'react';
import styled from 'styled-components';
import { addMonths, subMonths, format, getMonth, getYear } from 'date-fns';

interface InputMonthProps {
  startAt?: Date;
  onChange?: Function;
}

const Container = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 100%;
  width: 48px;
  border: none;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Month = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 20px;
`;

const Year = styled.div``;

enum INPUT_ACTIONS {
  INCREASE,
  DECREASE
}

const inputMonthReducer: React.Reducer<Date, INPUT_ACTIONS> = (
  date,
  action
) => {
  switch (action) {
    case INPUT_ACTIONS.INCREASE:
      return addMonths(date, 1);
    case INPUT_ACTIONS.DECREASE:
      return subMonths(date, 1);
  }
};

const InputMonth: React.FunctionComponent<InputMonthProps> = ({
  startAt,
  onChange
}) => {
  const now = Date.now();
  const initialDate = startAt || new Date(now);

  const [date, dispatch] = React.useReducer(inputMonthReducer, initialDate);

  React.useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date, onChange]);

  return (
    <Container>
      <Button
        aria-label="Decrease"
        onClick={() => {
          const isCurrentMonth = getMonth(date) === getMonth(now);
          const isCurrentYear = getYear(date) === getYear(now);

          if (isCurrentMonth && isCurrentYear) {
            return;
          }

          dispatch(INPUT_ACTIONS.DECREASE);
        }}
      />
      <Value>
        <Month>{format(date, 'MMMM')}</Month>
        <Year>{format(date, 'yyyy')}</Year>
      </Value>
      <Button
        aria-label="Increase"
        onClick={() => dispatch(INPUT_ACTIONS.INCREASE)}
      />
    </Container>
  );
};

export default InputMonth;
