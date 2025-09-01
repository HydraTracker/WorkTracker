document.addEventListener("DOMContentLoaded", () => {
    const currentDateEl = document.getElementById('currentDate');
    const workInput = document.getElementById('work');
    const peopleInput = document.getElementById('people');
    const saveBtn = document.getElementById('saveBtn');
    const workList = document.getElementById('workList');

    // Show today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    currentDateEl.textContent = formattedDate;

    // Load saved data from localStorage
    let savedWork = JSON.parse(localStorage.getItem('workData')) || [];

    // Render all work entries
    function renderWork() {
        workList.innerHTML = '';
        savedWork.forEach((entry, index) => {
            const div = document.createElement('div');
            div.classList.add('work-item');
            div.textContent = `Work done on ${entry.date} at ${entry.time}`;
            
            const details = document.createElement('div');
            details.classList.add('work-details');
            details.innerHTML = `
                <strong>Work:</strong> ${entry.work} <br>
                <strong>People Present:</strong> ${entry.people}
            `;

            div.appendChild(details);

            div.addEventListener('click', () => {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            });

            workList.appendChild(div);
        });
    }

    // Save new entry
    saveBtn.addEventListener('click', () => {
        const work = workInput.value.trim();
        const people = peopleInput.value.trim();

        if (!work || !people) {
            alert('Please fill in both fields.');
            return;
        }

        const time = new Date().toLocaleTimeString(); // add timestamp
        savedWork.push({
            date: formattedDate,
            time: time,
            work: work,
            people: people
        });

        localStorage.setItem('workData', JSON.stringify(savedWork));

        // Clear inputs
        workInput.value = '';
        peopleInput.value = '';

        renderWork();
    });

    // Initial render
    renderWork();
});