$(window).load(function () {
  $(".preloader").fadeOut("slow");
});

/* =Main INIT Function
-------------------------------------------------------------- */
function initializeSite() {
  "use strict";

  //OUTLINE DIMENSION AND CENTER
  (function () {
    function centerInit() {
      var sphereContent = $(".sphere"),
        sphereHeight = sphereContent.height(),
        parentHeight = $(window).height(),
        topMargin = (parentHeight - sphereHeight) / 2;

      sphereContent.css({
        "margin-top": topMargin + "px",
      });

      var heroContent = $(".hero"),
        heroHeight = heroContent.height(),
        heroTopMargin = (parentHeight - heroHeight) / 2;

      heroContent.css({
        "margin-top": heroTopMargin + "px",
      });
    }

    $(document).ready(centerInit);
    $(window).resize(centerInit);
  })();

  // Init effect
  //   $("#scene").parallax();
}
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(window).load(function () {
  initializeSite();
  (function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 0);
  })();
});
/* END ------------------------------------------------------- */

$("#countdown").countdown({
  date: "Sep 6 2025",
  render: function (data) {
    var el = $(this.el);
    el.empty()
      //.append("<div>" + this.leadingZeros(data.years, 4) + "<span>years</span></div>")
      .append(
        "<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>"
      )
      .append(
        "<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>"
      )
      .append(
        "<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>"
      )
      .append(
        "<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>"
      );
  },
});

$(document).ready(function () {
  $(".btn-join__wailist").on("click", function () {
    // Trigger Modal popup here.
    document.getElementById("waitlistModal").style.display = "flex";
  });
});

function closeModal() {
  document.getElementById("waitlistModal").style.display = "none";
}

function openSuccessModal() {
  document.getElementById("successtModal").style.display = "flex";
}

function closeSuccessModal() {
  document.getElementById("successtModal").style.display = "none";
}

// Optional: prevent actual submission
document
  .getElementById("waitlistForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const status = document.getElementById("my-form-status");
    const formBtn = document.getElementById("btn-submit");

    formBtn.disabled = true;
    formBtn.textContent = "Submitting...";

    fetch("https://formspree.io/f/mgvznoze", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          openSuccessModal(); // open success modal
          closeModal(); // close form modal
        } else {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  });
