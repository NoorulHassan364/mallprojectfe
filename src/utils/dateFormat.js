const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const shortFullDate = (date) => {
    const d = new Date(date);

    const month = monthNames[d.getMonth()];
    const day = `0${d.getDate()}`;
    const year = `${d.getFullYear()}`;
    // return `${d}`;
    return `${day.slice(-2)} ${month} ${year.slice(2)}`;
}