
    document.addEventListener("DOMContentLoaded", function () {
    const CLIENT_ID = '372847734905-k1qh9pblbj38d3hgk8g40hjq1o28u296.apps.googleusercontent.com'; // Replace with your Client ID
    const API_KEY = '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'; // Replace with your API Key
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";

    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            console.log('Google API client initialized.');
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch(function(error) {
            displayError('Error initializing Google API client: ' + error.message);
        });
    }

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            console.log('User is signed in.');
        } else {
            console.log('User is not signed in. Attempting to sign in.');
            gapi.auth2.getAuthInstance().signIn().catch(function(error) {
                displayError('Sign-in error: ' + error.message);
            });
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        clearErrors(); // Clear previous errors

        const form = event.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const date = form.date.value;
        const days = parseInt(form.days.value, 10);
        const guests = parseInt(form.guests.value, 10);

        if (!date || isNaN(days) || isNaN(guests)) {
            displayError('Invalid form data. Please check your input.');
            return;
        }

        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + days);

        const eventDetails = {
            'summary': `Reservation by ${name}`,
            'description': `Reservation for ${guests} guests`,
            'start': {
                'dateTime': startDate.toISOString(),
                'timeZone': 'Europe/Istanbul',
            },
            'end': {
                'dateTime': endDate.toISOString(),
                'timeZone': 'Europe/Istanbul',
            },
        };

        console.log('Creating event with details:', eventDetails);

        gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': eventDetails
        }).then(function(response) {
            console.log('Event created: ', response);
            alert('Rezervasyon başarılı!');
            form.reset();
        }).catch(function(error) {
            displayError('Error creating event: ' + error.message);
        });
    }

    function displayError(message) {
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerText = message;
            errorContainer.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerText = '';
            errorContainer.style.display = 'none';
        }
    }

    handleClientLoad();

    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
});
