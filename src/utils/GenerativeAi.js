// Function to call the Gemini API for effort estimation
const estimateEffort = async (summary, description,prompt) => {
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAbYDgCaMphU2i7zLgxwFo1b42tjBAPESc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      const result = await response.json();
      console.log(result)
      return result?.candidates[0]?.content?.parts?.[0]?.text?.trim() || "Unknown";
    } catch (err) {
      console.error("Error estimating effort:", err);
      return "Error";
    }
  };

  export default estimateEffort;