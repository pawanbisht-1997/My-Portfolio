(function() {
    var Progress = function(element, percent) {
        this.context = element.getContext("2d");
        this.width = element.width;
        this.height = element.height;
        this.percent = percent;
        this.init();
    };

    Progress.prototype = {
        init: function() {
            var self = this;
            self.tick = 15;
            var start = 4.72;
            var diff = (self.percent / 100) * Math.PI * 2;
            self.context.clearRect(0, 0, self.width, self.height);
            self.context.lineWidth = 10;
            self.context.fillStyle = "#fff";
            self.context.strokeStyle = "#ffc107";
            self.context.textAlign = "center";
            var fontSize = 30; // Adjust the font size here
            self.context.font = fontSize + "px Arial"; // Set the font size and family
            self.context.fillText(self.percent + "%", self.width * 0.5, self.height * 0.5 + fontSize * 0.4, self.width);
            var current = 0;
            var timer = setInterval(function() {
                if (current <= self.percent) {
                    self.context.clearRect(0, 0, self.width, self.height);
                    self.context.fillText(current + "%", self.width * 0.5, self.height * 0.5 + fontSize * 0.4, self.width);
                    self.context.beginPath();
                    self.context.arc(self.width * 0.5, self.height * 0.5, 65, start, (current / 100) * Math.PI * 2 + start, false);
                    self.context.stroke();
                    current++;
                } else {
                    clearInterval(timer);
                }
            }, self.tick);
        }
    };

    var CircularSkillBar = function(elements) {
        this.bars = document.querySelectorAll(elements);
        if (this.bars.length > 0) {
            this.init();
        }
    };

    CircularSkillBar.prototype = {
        init: function() {
            var self = this;

            var options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var canvas = entry.target.querySelector(".bar-circle");
                        var percent = parseInt(entry.target.getAttribute("data-percent"), 10);
                        var prog = new Progress(canvas, percent);
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            self.bars.forEach(function(bar) {
                observer.observe(bar);
            });
        },
    };
    document.addEventListener("DOMContentLoaded", function() {
        var circularBars = new CircularSkillBar("#new-bars .bar");
    });
})();





document.addEventListener('DOMContentLoaded', function () {
    // Get all menu links
    const menuLinks = document.querySelectorAll(".menu a");
    // Get all sections
    const sections = document.querySelectorAll("section");
    sections[0].classList.add("active-slide");

    // Function to handle menu link clicks
    function handleMenuClick(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");

        // Remove active-slide class from all sections
        sections.forEach((section) => {
            section.classList.remove("active-slide");
        });

        // Add active-slide class to the target section
        const targetSection = document.querySelector(targetId);
        targetSection.classList.add("active-slide");

        // Trigger the shutter animation
        const shutter = document.querySelector(".shutter");
        shutter.style.transform = "translateY(-100%)";

        // Wait for the shutter animation to finish
        setTimeout(() => {
            // Reset the shutter position
            shutter.style.transform = "translateY(0)";
        }, 500); // 500ms matches the animation duration

        // Update circular progress bars (you can implement your logic here)
        updateCircularBars(targetSection);
    }

    // Attach click event listener to each menu link
    menuLinks.forEach((link) => {
        link.addEventListener("click", handleMenuClick);
    });


});