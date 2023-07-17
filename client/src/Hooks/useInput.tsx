import React, { useState } from 'react';

const useInputs = (initValue: string) => {
  const [value, setValue] = useState(initValue);
  const onHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, onHandler] as const;
};

export default useInputs;
