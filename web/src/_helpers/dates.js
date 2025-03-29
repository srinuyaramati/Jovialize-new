


export function dateFormat(inputDate) {
    let date = new Date(inputDate);
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedDate = formatter.format(date);
    return formattedDate; 
}

export function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

export function fullDateFormat(date, format = "en-GB") {
  if(date) {
    let options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    let updatedDate = new Date(date).toISOString().split('T')[0];
    updatedDate = new Date(updatedDate);
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(updatedDate);
    return formattedDate;  
  } else return null
  
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'; // Covers 11th through 19th
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export function formatDateWithOrdinalSuffix(date) {
  let updatedDate = new Date(date).toISOString().split('T')[0];
    updatedDate = new Date(updatedDate);
  const day = updatedDate.getDate();
  const dayWithSuffix = day + getOrdinalSuffix(day);  
  const options = { month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  
  return `${dayWithSuffix} ${formatter.format(updatedDate)}`;
}