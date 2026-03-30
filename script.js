document.getElementById("feedbackForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, message })
  });

  const data = await res.json();
  document.getElementById("responseMsg").innerText = data.message;

  document.getElementById("feedbackForm").reset();
});