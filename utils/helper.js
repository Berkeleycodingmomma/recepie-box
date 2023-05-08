module.exports = {

    //Below formating date/time info to MM/DD/YYYY  HH:mm
    format_date: (date) => {
        const d = new Date(date);
        const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        return `${formattedDate} at ${formattedTime}`;
    }
}