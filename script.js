const flickityInstances = [];

function resizeAllCarousels() {
    flickityInstances.forEach(inst => {
        if (typeof inst.resize === 'function') {
            inst.resize();
        }
    });
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    resizeAllCarousels();
    setTimeout(resizeAllCarousels, 50);
}

function setActiveNav(el) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');
}

function showSubSection(id, btn) {
    document.querySelectorAll('.sub-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');
    resizeAllCarousels();
    setTimeout(resizeAllCarousels, 50);
}

showSection('Navettes');

window.onload = function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("gq1BmcieISE4bGWHT");
        console.log("EmailJS initialized successfully.");
    }

    if (typeof Flickity !== 'undefined') {
        const flickityOptions = {
            cellAlign: 'center',
            contain: true,
            groupCells: false,
            freeScroll: false,
            wrapAround: false,
            prevNextButtons: true,
            pageDots: true,
            adaptiveHeight: true
        };
        document.querySelectorAll('.carousel').forEach(el => {
            const flkty = new Flickity(el, flickityOptions);
            flickityInstances.push(flkty);
        });
        window.addEventListener('resize', resizeAllCarousels);
    }

    const form = document.querySelector("form");
    if (!form) return;

    
    const dateInput = document.getElementById("Date");
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute("min", today);
    }

   
    const nombreInput = document.getElementById("Nombre");
    if (nombreInput) {
        nombreInput.addEventListener("input", function() {
            let value = this.value;
            if (value && !['1', '2', '3'].includes(value)) {
                this.value = '';
            }
        });
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (typeof emailjs === 'undefined') {
            alert("Service email non disponible.");
            return;
        }

        const templateParams = {
            Nom: document.getElementById("Nom")?.value || "",
            Prenom: document.getElementById("Prenom")?.value || "",
            Email: document.getElementById("Email")?.value || "",
            Tel: document.getElementById("Tel")?.value || "",
            LieuDepart: document.getElementById("LieuDepart")?.value || "",
            LieuArrivee: document.getElementById("LieuArrivee")?.value || "",
            Date: document.getElementById("Date")?.value || "",
            Nombre: document.getElementById("Nombre")?.value || "",
            Message: document.getElementById("Message")?.value || ""
        };

        if (!templateParams.Nom || !templateParams.Prenom || !templateParams.Email || !templateParams.Tel || !templateParams.LieuDepart || !templateParams.LieuArrivee || !templateParams.Date || !templateParams.Nombre || !templateParams.Message) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }

        emailjs.send("service_cv7uuje", "template_b5e4yqn", templateParams)
            .then(function(response) {
                alert("Email envoyé avec succès ! Merci de nous avoir contactés.");
                console.log("SUCCESS!", response.status, response.text);
                form.reset();
            })
            .catch(function(error) {
                alert("Échec de l'envoi de l'email.");
                console.error("FAILED...", error);
            });
    });
};