// app.js
console.log("🔥 Flame Division Affiliate Funnel — app.js loaded");

// ---------- TTS CONFIG ----------
var FD_TTS_TEXT =
  "Welcome to the Flame Division Partner Program. " +
  "This is an operator grade affiliate funnel, not a hype campaign. " +
  "Here is how it works. " +
  "Affiliates never represent Flame Division. They only refer. " +
  "Your job is simple: share a unique referral link, and send people to the official read only pages. " +
  "You do not teach, you do not coach, you do not promise outcomes, and you never touch payments or curriculum. " +
  "The commission model stays clean: around twenty to thirty percent per paid enrollment, " +
  "paid monthly once payments fully clear, with no multi level marketing and no downlines. " +
  "Technical setup starts manual, using simple referral links with question mark ref handles, " +
  "and can upgrade later to tools like Stripe and dedicated referral platforms when traffic grows. " +
  "All instruction, certification, and governance remain fully under Flame Division control. " +
  "If you align with that structure and want to extend the signal, scroll down and request partner access.";

var fdCurrentUtterance = null;

function fdSpeak() {
  if (!("speechSynthesis" in window)) {
    alert("Text to speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  var utterance = new SpeechSynthesisUtterance(FD_TTS_TEXT);
  utterance.rate = 1.02;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  var voices = window.speechSynthesis.getVoices();
  if (voices && voices.length) {
    // Try to pick a calm, neutral voice if available
    var preferred = voices.find(function (v) {
      var name = v.name.toLowerCase();
      return (
        name.indexOf("daniel") !== -1 ||
        name.indexOf("samantha") !== -1 ||
        name.indexOf("google uk english male") !== -1
      );
    });
    if (preferred) {
      utterance.voice = preferred;
    }
  }

  fdCurrentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function fdStopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  fdCurrentUtterance = null;
}

// ---------- FORM HANDLING ----------
function fdHandleFormSubmit(event) {
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var handle = document.getElementById("handle").value.trim();
  var audience = document.getElementById("audience").value.trim();
  var values = document.getElementById("values").value.trim();

  if (!name || !email || !audience) {
    alert("Please complete the required fields before submitting.");
    return;
  }

  var summary =
    "Partner request captured.\n\n" +
    "Name: " +
    name +
    "\n" +
    "Email: " +
    email +
    "\n" +
    "Handle: " +
    (handle || "(not provided)") +
    "\n\n" +
    "Audience:\n" +
    audience +
    "\n\n" +
    "Values:\n" +
    (values || "(not provided)") +
    "\n\n" +
    "You can copy this summary into your inbox or partner tracker.";

  console.log("📝 Flame Division partner request:", {
    name: name,
    email: email,
    handle: handle,
    audience: audience,
    values: values
  });

  alert(
    "Thank you. Your partner request has been logged on this page.\n\n" +
      "Next step: copy any important details you need from the console or this message, " +
      "then send us an email with the same information so we can review."
  );

  // Optional: clear fields after submission
  event.target.reset();
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", function () {
  var playBtn = document.getElementById("fd-tts-play");
  var stopBtn = document.getElementById("fd-tts-stop");
  var form = document.getElementById("fd-apply-form");

  if (playBtn) {
    playBtn.addEventListener("click", fdSpeak);
  }

  if (stopBtn) {
    stopBtn.addEventListener("click", fdStopSpeech);
  }

  if (form) {
    form.addEventListener("submit", fdHandleFormSubmit);
  }

  // Preload voices for some browsers
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = function () {
      window.speechSynthesis.getVoices();
    };
  }
});
