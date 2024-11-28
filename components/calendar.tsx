import { Calendar as DatePicker } from "react-native-calendars";
import { palette } from "../components/ui/palette";

type CalendarProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
export const Calendar = ({ selected, setSelected }: CalendarProps) => (
  <DatePicker
    onDayPress={(day: { dateString: string }) => {
      setSelected(day.dateString);
    }}
    markedDates={{
      [selected]: {
        selected: true,
        selectedColor: palette.primary,
      },
    }}
    theme={{
      calendarBackground: palette.background,
      monthTextColor: palette.text,
      textMonthFontSize: 18,
      textMonthFontWeight: "600",
      textSectionTitleColor: palette.text,
      textDayHeaderFontWeight: "600",
      textDayHeaderFontSize: 14,
      dayTextColor: palette.text,
      textDayFontSize: 16,
      textDayFontWeight: "400",
      selectedDayBackgroundColor: palette.primary,
      selectedDayTextColor: "#FFFFFF",
      todayTextColor: palette.primary,
      textDisabledColor: palette.border,
      arrowColor: palette.primary,
      todayButtonFontWeight: "600",
    }}
    style={{
      borderRadius: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      margin: 20,
    }}
  />
);
