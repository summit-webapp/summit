export const dateFormat = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth(); // 0-based index for months
    const year = date.getFullYear();
    // Array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Get the full month name
    const monthName = monthNames[monthIndex];
    return `${monthName} ${day}, ${year}`;
}