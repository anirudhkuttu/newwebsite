document.getElementById("feedbackForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, message })
    });

    const data = await res.json();
    document.getElementById("responseMsg").innerText = data.message;

  } catch (error) {
    console.error(error);
    document.getElementById("responseMsg").innerText = "Something went wrong!";
  }

  document.getElementById("feedbackForm").reset();
});