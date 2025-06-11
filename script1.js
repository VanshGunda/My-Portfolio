document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add this to your existing JavaScript file
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.list');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.list a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.right') && !e.target.closest('.mobile-menu-btn')) {
        mobileMenuBtn.classList.remove('active');
        navList.classList.remove('active');
    }
});

function downloadCV() {
    const cvUrl = './VanshCV.pdf'; 

    try {
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = 'Vansh_CV.pdf';
        if (confirm('Do you want to download the CV?')) {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert('Downloaded successfully!');
        }
    } catch (error) {
        alert('Sorry, there was an error downloading the CV. Please try again.');
        console.error('Download error:', error);
    }
}



function visitGithub() {

    window.open('https://github.com/VanshGunda', 'VanshGunda');
}


document.addEventListener('DOMContentLoaded', (event) => {
    const downloadButton = document.getElementById('downloadCV');
    const githubButton = document.getElementById('visitGithub');

    if (downloadButton) {
        downloadButton.addEventListener('click', downloadCV);
    }

    if (githubButton) {
        githubButton.addEventListener('click', visitGithub);
    }
});

async function sendMessage() {

    const emailInput = document.getElementById("fromEmail");
    const messageInput = document.getElementById("messageText");
    const status = document.getElementById("sendMessageStatus");
    const submitBtn = document.querySelector(".submit-btn");







    status.textContent = "Message sent successfully!";
    status.className = "message success";


    status.textContent = error.message || "Failed to send message. Please try again.";
    status.className = "message error";


    submitBtn.disabled = true;

    try {
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();


        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            throw new Error("Email address is required.");
        }

        if (!emailRegex.test(email)) {
            throw new Error("Please enter a valid email address.");
        }

        if (!message) {
            throw new Error("Message is required.");
        }

        if (message.length < 5) {
            throw new Error("Message must be at least 5 characters.");
        }

        const templateParams = {
            from_email: email,
            message: message,
            to_email: 'gundavansh9@gmail.com'
        };


        emailjs.init("Nbn9D7LJ2Ky7a-Mzo");

        await emailjs.send(
            "service_vns840v",
            "template_vnsyf9b",
            templateParams
        ).catch(error => {
            throw new Error("Email service error: " + error.message);
        });


        emailInput.value = "";
        messageInput.value = "";

        status.textContent = "Message sent successfully!";
        status.style.color = "#155724";
        status.style.backgroundColor = "#d4edda";
        status.style.padding = "10px";
        status.style.borderRadius = "4px";
        status.style.marginTop = "10px";

    } catch (error) {
        status.textContent = error.message || "Failed to send message. Please try again.";
        status.style.color = "#dc3545";
        status.style.backgroundColor = "#ffe6e6";
        status.style.padding = "10px";
        status.style.borderRadius = "4px";
        status.style.marginTop = "10px";
    } finally {
        submitBtn.disabled = false;
    }
}


document.getElementById("fromEmail").addEventListener("input", function () {
    const status = document.getElementById("sendMessageStatus");
    status.textContent = "";
    status.className = "message";
});

document.getElementById("messageText").addEventListener("input", function () {
    const status = document.getElementById("sendMessageStatus");
    status.textContent = "";
    status.className = "message";
});


document.getElementById("yourFormId").addEventListener("submit", async (e) => {
    e.preventDefault();
    await sendMessage();
});
