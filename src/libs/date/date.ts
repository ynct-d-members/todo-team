import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export const parseFormat = (data: Date, format = "YYYY/MM/DD HH:mm:ss") => {
  return dayjs(data).format(format);
};
