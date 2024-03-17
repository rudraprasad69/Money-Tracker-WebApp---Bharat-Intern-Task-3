var popup = document.getElementById('popup');
var popup1 = document.getElementById('popup1');
var tar = document.getElementById('name');

document.getElementById('form1').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/signupForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = data.message;
            document.getElementById('form1').reset();
        })
        .catch(error => console.error('Error:', error));
});

let isCredentialMatched = 0;

function signIn() {
    const username = document.getElementById('u').value;
    const password = document.getElementById('p').value;

    fetch('/signinForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            isCredentialMatched = data.isMatched;

            if (isCredentialMatched === 1) {
                popup1.style.display = "none";
                document.getElementById('data').style.display = "flex";
                document.getElementById('display').textContent = data.username;
            } else {
                document.getElementById('mes').textContent = "Credentials not matched!";
                cr();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function cr() {
    var d = document.getElementById('data');
    d.style.display = "none";
}

function toggle() {

    popup.style.display = "none"

    var blur = document.getElementById('blur');
    blur.classList.toggle('active');

    var blur = document.getElementById('blur1');
    blur.classList.toggle('active');

    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

function pop() {
    popup.style.display = "flex"
}

function pop1() {
    popup1.style.display = "flex"
}

function show() {
    document.getElementById('popup2').style.display = "flex";
}

function f() {
    document.getElementById('popup2').style.display = "none";
    var cu = document.getElementById('c').value;
    var ex = document.getElementById('e').value;
    var n1 = parseInt(cu);
    var n2 = parseInt(ex);

    var ncu = n1 - n2;

    // Get the username from the display element
    var username = document.getElementById('display').textContent;

    // Construct the request body
    var formData = {
        username: username,
        ncu: ncu
    };

    fetch('/current', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // document.getElementById('bal').style.display = "flex";
            // document.getElementById('bal').style.color = "#000";
            // document.getElementById('bal').textContent = data.currentbalance;
            // console.log("Balance updated successfully!");
            // document.getElementById('form3').reset();
        })
        // .catch(error => console.error('Error:', error));
}

function fetchNcuAndUpdateBal() {
    fetch('/getNcu')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('bal').textContent = data.ncu;
            console.log(data.ncu);
        })
        .catch(error => console.error('Error:', error));
}