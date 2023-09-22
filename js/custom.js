(function () {
    var Progress = function (element, percent) {
        this.context = element.getContext("2d");
        this.width = element.width;
        this.height = element.height;
        this.percent = percent;
        this.init();
    };

    Progress.prototype = {
        init: function () {
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
            var timer = setInterval(function () {
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

    var CircularSkillBar = function (elements) {
        this.bars = document.querySelectorAll(elements);
        if (this.bars.length > 0) {
            this.init();
        }
    };

    CircularSkillBar.prototype = {
        init: function () {
            var self = this;

            var options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var canvas = entry.target.querySelector(".bar-circle");
                        var percent = parseInt(entry.target.getAttribute("data-percent"), 10);
                        var prog = new Progress(canvas, percent);
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            self.bars.forEach(function (bar) {
                observer.observe(bar);
            });
        },
    };    
    document.addEventListener("DOMContentLoaded", function () {
        var circularBars = new CircularSkillBar("#new-bars .bar");
    });
})();





document.addEventListener('DOMContentLoaded', function () {
    // Get all menu items
    var menuItems = document.querySelectorAll(".menu ul li a");
    // Get all sections
    var sections = document.querySelectorAll(".slide");
    // Get the shutter element
    var shutter = document.querySelector(".shutter");
    
    // Initially, set the first section as active
    sections[0].classList.add("active-section");

    menuItems.forEach((menuItem) => {

        menuItem.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target section's ID from the data attribute
            var targetSectionId = menuItem.getAttribute("data-target");

            // Remove the 'active-section' class from all sections
            sections.forEach(function (section) {
                section.classList.remove("active-section");
            });

            // Add the 'active-section' class to the selected section
            document.getElementById(targetSectionId).classList.add("active-section");
            window.scrollTo(0, 0);

            // Toggle the class to animate the shutter
            shutter.classList.add("slide-down");
            
            // Reset the shutter animation after a delay
            setTimeout(function () {
                shutter.classList.remove("slide-down");
            }, 500);
        })
    })
});



