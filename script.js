const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "default_service";
  const templateID = "template_g873i4k";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      alert("Sent!");
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});

const Days = document.getElementById("days");
const Hours = document.getElementById("hours");
const Minutes = document.getElementById("minutes");
const Seconds = document.getElementById("seconds");

const targetDate = new Date("April 5 2025 00:00:00").getTime();

function timer() {
  const currentDate = new Date().getTime();
  const distance = targetDate - currentDate;
  const days = Math.floor(distance / 1000 / 60 / 60 / 24);
  const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(distance / 1000 / 60) % 60;
  const seconds = Math.floor(distance / 1000) % 60;

  Days.innerHTML = days;
  Hours.innerHTML = hours;
  Minutes.innerHTML = minutes;
  Seconds.innerHTML = seconds;

  if (distance < 0) {
    Days.innerHTML = "00";
    Hours.innerHTML = "00";
    Minutes.innerHTML = "00";
    Seconds.innerHTML = "00";
  }
}

setInterval(timer, 1000);

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const titles = document.querySelectorAll("h2:not(.reception)");
  const receptionTitle = document.querySelector("h2.reception");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        console.log("Observing section:", entry.target); // Debugging log
        if (entry.isIntersecting) {
          console.log("Section visible, adding fade-in-up:", entry.target);
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Slightly adjusted threshold
    }
  );

  const titleObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        console.log("Observing title:", entry.target);
        if (entry.isIntersecting) {
          console.log("Title visible, adding slide-in-left:", entry.target);
          entry.target.classList.add("slide-in-left");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  if (receptionTitle) {
    const receptionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          console.log("Observing reception title:", entry.target);
          if (entry.isIntersecting) {
            console.log(
              "Reception title visible, adding slide-in-right:",
              entry.target
            );
            entry.target.classList.add("slide-in-right");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );
    receptionObserver.observe(receptionTitle);
  } else {
    console.warn("No <h2 class='reception'> found in the document.");
  }

  sections.forEach((section) => {
    observer.observe(section);
  });

  titles.forEach((title) => {
    titleObserver.observe(title);
  });
});
