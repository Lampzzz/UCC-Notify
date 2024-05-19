import { formatDate } from "@Utils/formatDate";

const DateFormat = ({ date, isDark = true }) => {
  return (
    <div className={isDark ? "text-black-50" : "text-white"}>
      {formatDate(date)}
    </div>
  );
};

export default DateFormat;
