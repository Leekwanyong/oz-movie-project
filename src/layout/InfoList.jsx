function InfoList({ data }) {
  return (
    <ul>
      {data?.map((item, i) => (
        <li key={item + i} className="mb-2">
          <p>
            {item.label} : {item.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default InfoList;
