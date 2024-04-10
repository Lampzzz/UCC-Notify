import { formatDate } from "@Utils/formatDate";

const DateFormat = ({ date, style }) => {
  return <div className={style}>{formatDate(date)}</div>;
};

export default DateFormat;
