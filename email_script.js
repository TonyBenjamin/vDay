emailjs.init("tr9hMiOFn21g3eswR");

// Function to toggle visibility of the "Other" input fields
function toggleOtherInput(selectId) {
    const selectElement = document.getElementById(selectId);
    const otherInputElement = document.getElementById(`${selectId}-other`);
    if (selectElement.value === 'Other') {
        otherInputElement.style.display = 'block';
    } else {
        otherInputElement.style.display = 'none';
    }
}


document.getElementById('love-questionnaire').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Include the "Other" input values if they are visible and not empty
    if (document.getElementById('q1-other').style.display === 'block' && document.getElementById('q1-other').value !== '') {
        data.q1 = document.getElementById('q1-other').value;
    }
    if (document.getElementById('q2-other').style.display === 'block' && document.getElementById('q2-other').value !== '') {
        data.q2 = document.getElementById('q2-other').value;
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            service_id: 'service_7vzomlh',
            template_id: 'template_iwxec0x',
            user_id: 'tr9hMiOFn21g3eswR',
            template_params: {
                'q1': data.q1,
                'q2': data.q2,
                'q3': data.q3,
                'to_name': 'Tony', // Replace with the recipient's name if needed
                'from_name': 'Alaina', // Replace with the submitter's name if available
                'email': data.email
            }
        })
    })
    .then(response => {
        console.log('Response:', response);
        if (response.status === 200) {
            document.getElementById('results').innerText = 'Email sent successfully!';
            handleSubmitClick();
            return response.text(); // Handle plain text response
        } else {
            document.getElementById('results').innerText = 'An error occurred. Please try again.';
        }
        return response.json();
    })
    .then(result => {
        console.log('Result:', result);
    })
    .catch(error => {
        document.getElementById('results').innerText = 'An error occurred. Please try again.';
        console.error('Error:', error);
    });
    
});

function handleSubmitClick() {
    window.location.href = "yes_page.html";
}