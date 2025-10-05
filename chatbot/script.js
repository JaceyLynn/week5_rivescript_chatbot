document.addEventListener("DOMContentLoaded", () => {
    const bot = new RiveScript();

    bot.loadFile("bot.rive").then(() => {
        bot.sortReplies();
        console.log("RiveScript bot loaded and replies sorted.");

        const chatInput = document.getElementById("chat-input");
        const chatOutput = document.getElementById("chat-output");
        const sendButton = document.getElementById("send-button");

        const appendMessage = (sender, message) => {
            const messageElement = document.createElement("div");
            messageElement.textContent = `${sender}: ${message}`;
            chatOutput.appendChild(messageElement);
            chatOutput.scrollTop = chatOutput.scrollHeight;
        };

        const handleUserMessage = () => {
            const userMessage = chatInput.value.trim();
            if (userMessage) {
                appendMessage("You", userMessage);
                bot.reply("local-user", userMessage).then((reply) => {
                    appendMessage("Bot", reply);
                });
                chatInput.value = "";
            }
        };

        sendButton.addEventListener("click", handleUserMessage);
        chatInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                handleUserMessage();
            }
        });
    }).catch((error) => {
        console.error("Error loading RiveScript file:", error);
    });
});
