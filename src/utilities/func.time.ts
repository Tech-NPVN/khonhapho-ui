const getTimeAgo = (date?: string): string => {
  const datePublish = new Date(date || new Date().toISOString());
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - datePublish.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthDifference = Math.floor(daysDifference / 30);
  const yearDifference = Math.floor(monthDifference / 12);
  if (secondsDifference < 10) return 'Vừa xong';
  else if (yearDifference > 10)
    return `${String(datePublish.getDate()).padStart(2, '0')}/${String(
      datePublish.getMonth() + 1,
    ).padStart(2, '0')}/${datePublish.getFullYear()}`;
  if (yearDifference > 1) {
    return `${yearDifference} năm trước`;
  }
  if (monthDifference > 1) {
    return `${monthDifference} tháng trước`;
  } else if (daysDifference > 1) {
    return `${daysDifference} ngày trước`;
  } else if (hoursDifference > 1) {
    return `${hoursDifference} giờ trước`;
  } else if (minutesDifference > 1) {
    return `${minutesDifference} phút trước`;
  } else {
    return `${secondsDifference} giây trước`;
  }
};
const convertReportingTime = (reportingTime?: string): string => {
  const date = new Date(reportingTime || new Date().toISOString());
  return date
    .toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .slice(0, -3)
    .replace(',', ' ');
};
export { convertReportingTime, getTimeAgo };
