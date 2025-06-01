(function(window, document) {
    var s = []; // Array to store heart objects

    // Animation loop
    function r() {
        for (var e = s.length - 1; e >= 0; e--) {
            if (s[e].alpha <= 0) {
                document.body.removeChild(s[e].el);
                s.splice(e, 1);
            } else {
                s[e].y--;
                s[e].scale += 0.004;
                s[e].alpha -= 0.013;
                s[e].el.style.cssText = `left:${s[e].x}px;top:${s[e].y}px;opacity:${s[e].alpha};transform:scale(${s[e].scale},${s[e].scale}) rotate(45deg);background:${s[e].color};z-index:1000`;
            }
        }
        requestAnimationFrame(r);
    }

    // Set up click handler
    function n() {
        var originalOnclick = typeof window.onclick === "function" && window.onclick;

        window.onclick = function(e) {
            if (originalOnclick) originalOnclick();
            o(e);

            // Bật nhạc khi click, đảm bảo nhạc chạy trên trình duyệt
            var audio = document.getElementById('bgMusic');
            if (audio && audio.paused) {
                audio.play();
            }
        };
    }

    // Create a heart on click
    function o(e) {
        var a = document.createElement("div");
        a.className = "heart";
        s.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: c()
        });
        document.body.appendChild(a);
    }

    // Generate random RGB color
    function c() {
        return `rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})`;
    }

    // Inject CSS
    function i(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (e) {
            style.styleSheet.cssText = css; // Fallback for older browsers
        }
        document.getElementsByTagName("head")[0].appendChild(style);
    }

    // Polyfill for requestAnimationFrame
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, 1000 / 60);
        };

    // Inject heart CSS
    i(`
        .heart {
            width: 10px;
            height: 10px;
            position: fixed;
            background: #f00;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
        }
        .heart:after, .heart:before {
            content: '';
            width: inherit;
            height: inherit;
            background: inherit;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            position: absolute;
        }
        .heart:after {
            top: -5px;
        }
        .heart:before {
            left: -5px;
        }
    `);

    // Initialize
    n();
    r();
})(window, document);
