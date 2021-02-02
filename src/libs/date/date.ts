import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

const format = (data: Date, format = "YYYY/MM/DD HH:mm:ss") => {
  return dayjs(data).format(format);
};

export const date = {
  format,
};
