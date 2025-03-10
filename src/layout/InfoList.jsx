import React, { useMemo } from 'react';

function InfoList({ data = [] }) {
  const memoizedData = useMemo(() => data, [data]);
  return (
    <ul>
      {memoizedData?.map((item) => (
        <li key={item.label} className="mb-2">
          <p>
            {item.label} : {item.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(InfoList);
