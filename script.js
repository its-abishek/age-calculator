const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");


function calculateAge() {
    const birthdayValue = birthdayEl.value;
    if (birthdayValue === "") {
        alert("Please enter your birthday");
    } else {
        const { years, months, days, nextBirthdayMonths, nextBirthdayDays } = getDetailedAge(birthdayValue);
        resultEl.innerHTML = `
            You are ${years} ${years > 1 ? "years" : "year"}, ${months} ${months > 1 ? "months" : "month"}, 
            and ${days} ${days > 1 ? "days" : "day"} old.<br>
            Your next birthday is in ${nextBirthdayMonths} ${nextBirthdayMonths > 1 ? "months" : "month"} 
            and ${nextBirthdayDays} ${nextBirthdayDays > 1 ? "days" : "day"}.
        `;
    }
}

function getDetailedAge(birthdayValue) {
    const currentDate = new Date();
    const birthdayDate = new Date(birthdayValue);
    let years = currentDate.getFullYear() - birthdayDate.getFullYear();
    let months = currentDate.getMonth() - birthdayDate.getMonth();
    let days = currentDate.getDate() - birthdayDate.getDate();

    // Adjust years, months, and days for negative values
    if (days < 0) {
        months--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate next birthday
    const nextBirthdayYear = (currentDate.getMonth() > birthdayDate.getMonth() || 
        (currentDate.getMonth() === birthdayDate.getMonth() && currentDate.getDate() >= birthdayDate.getDate()))
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();

    const nextBirthday = new Date(nextBirthdayYear, birthdayDate.getMonth(), birthdayDate.getDate());

    // Handle cases where next birthday falls outside the valid date range (e.g., leap years)
    if (nextBirthday.getDate() !== birthdayDate.getDate()) {
        nextBirthday.setDate(nextBirthday.getDate() - 1);
    }

    const diffTime = nextBirthday - currentDate;
    const nextBirthdayDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Total days
    const nextBirthdayMonths = Math.floor(nextBirthdayDays / 30); // Approximation for months
    const remainingDays = (nextBirthdayDays % 30) + 1; // Remaining days after months

    return { years, months, days, nextBirthdayMonths, nextBirthdayDays: remainingDays };
}





btnEl.addEventListener("click", calculateAge);
