// script.js (Simplified for focus on scheduling)

document.addEventListener('DOMContentLoaded', () => {
    // --- Existing code for smooth scrolling and mobile navigation toggle (KEEP THIS) ---
    // Make sure these parts of your script.js are still there if you need them.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            const navbarLinks = document.querySelector('.nav-links');
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (navbarLinks && navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
            }
        });
    });

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbarLinks = document.querySelector('.nav-links');
    if (hamburgerMenu && navbarLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // The original `updateDrawNumbers` and `scheduleNextResult` functions are not strictly
    // necessary for a static prize structure page, but if you intend to add dynamic
    // elements later, you might want to uncomment and adapt them.
    // For this specific request, they are commented out as the page is static.

    // --- YOUR CUSTOM FUNCTION FOR UPDATING DRAW NUMBERS ---
    // This is where you'll call your own fair result'
    function updateDrawNumbers() {
        console.log("Updating draw numbers (Placeholder function for prize page).");
        // In a real application, you would fetch new data here
        // and update the DOM elements displaying the results.
        // Example:
        // document.getElementById('first-prize').textContent = generateRandom4DigitNumber();
        // document.getElementById('second-prize').textContent = generateRandom4DigitNumber();
        // document.getElementById('third-prize').textContent = generateRandom4DigitNumber();
        // ... and so on for starter and consolation prizes
    }

    /**
     * Helper function to generate a random 4-digit number.
     * @returns {string} A random 4-digit number (e.g., "1234").
     */
    function generateRandom4DigitNumber() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    /**
     * Schedules the next result update for a specific time each day.
     * If the specified time has passed for today, it schedules for tomorrow.
     * @param {number} hour - The hour (0-23) for the update.
     * @param {number} minute - The minute (0-59) for the update.
     * @param {number} second - The second (0-59) for the update.
     */
    function scheduleNextResult(hour, minute, second) {
        const now = new Date();
        const updateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);

        // If the update time has already passed today, schedule for tomorrow
        if (updateTime.getTime() < now.getTime()) {
            updateTime.setDate(updateTime.getDate() + 1); // Move to the next day
        }

        const timeToWait = updateTime.getTime() - now.getTime();
        console.log(`Next result update scheduled for: ${updateTime.toLocaleString()} (in ${timeToWait / 1000} seconds)`);

        setTimeout(() => {
            updateDrawNumbers(); // Execute your update logic
            // After executing, re-schedule for the next day
            scheduleNextResult(hour, minute, second);
        }, timeToWait);
    }

    // --- CALL THIS FUNCTION TO SCHEDULE YOUR NEXT DRAW ---
    // Example: Schedule the next draw result to appear at 9:00 PM (21:00:00) today.
    // Based on current time (Wednesday, August 6, 2025 at 8:48:16 PM +08):
    // This will run in about 11 minutes.
    // scheduleNextResult(21, 0, 0); // 9 PM, 0 minutes, 0 seconds

    // Optional: Call updateDrawNumbers once on page load if you want initial results displayed.
    // updateDrawNumbers();
});