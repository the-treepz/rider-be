const DateFormat = {
  /**
   *
   * @param date accepts 22-12-2023
   * returns 2023-12-22
   */
  formatDate(date: string) {
    const split = date.split('-');
    const year = split[2];
    const month = split[1];
    const day = split[0];
    return `${year}-${month}-${day}`;
  },
  getCurrentDate() {
    return new Date();
  },
  addMinutesToDate(minutes: number) {
    return new Date(new Date().getTime() + minutes * 60000);
  },
  deductMinutesFromDate(minutes: number) {
    return new Date(new Date().getTime() - minutes * 60000);
  },
  /**
   * one month ago
   */
  getDateInMonthAgo(time: number) {
    const currentDate = new Date();
    const oneMonthAgoDate = new Date(currentDate);
    oneMonthAgoDate.setMonth(currentDate.getMonth() - time);
    return new Date(oneMonthAgoDate);
  },
  getFutureMonth(time: number) {
    const currentDate = new Date();
    const oneMonthAgoDate = new Date(currentDate);
    oneMonthAgoDate.setMonth(currentDate.getMonth() + time);
    return new Date(oneMonthAgoDate).toISOString();
  },
  getDateInDaysAgo(day: number) {
    const currentDate = new Date();
    const daysAgoDate = new Date(currentDate);
    daysAgoDate.setDate(currentDate.getDate() - day);
    return new Date(daysAgoDate.toISOString());
  },
  getCurrentDateInIsoFormat() {
    return new Date(new Date().toISOString());
  },
  /**
   *
   * @param dateOfBirth
   * returns "2001-11-15"
   */
  reverseBirthday(dateOfBirth: string) {
    const split = dateOfBirth.split('-');
    return `${split[2]}-${split[1]}-${split[0]}`;
  },
  convertUnixToIsoDate(unixTimestamp: number) {
    // Convert Unix timestamp to milliseconds by multiplying with 1000
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    return date.toISOString();
  },
};
export default DateFormat;
