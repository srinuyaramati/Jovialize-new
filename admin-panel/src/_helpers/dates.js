export function dateFormat(inputDate, format = 'en-GB') {
    let date = new Date(inputDate);
    let formatter = new Intl.DateTimeFormat(format, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedDate = formatter.format(date);
    return formattedDate; 
}

export function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

export function dateFormat1(date, format) {
  let updatedDate = new Date(date).toISOString().split('T')[0];
  updatedDate = new Date(updatedDate);
  const formattedDate = updatedDate.toLocaleDateString(format);
  return formattedDate;  
}
