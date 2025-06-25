// Global function to format a JavaScript Date object to "YYYY-MM-DD" format
export const Dateformatter = (date) => {
    if (!date) return null; // Return null if no date is provided
  
    // Check if it's a valid date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return null;
  
    // Format the date to "YYYY-MM-DD"
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(parsedDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  