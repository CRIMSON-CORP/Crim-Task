import { Box, Heading } from "native-base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Greeting = () => {
    const { last } = useSelector((state) => state.account.name);
    const [greeting, setGreeting] = useState("");
    const MorinngGreetings = [
        "What's up",
        "How are you",
        "Rise and Shine",
        "Hello there",
        "Good Morining",
        "Have a great day",
        "Look Alive",
        "Morning",
    ];

    const AfternoonGreetings = [
        "What's up",
        "How are you",
        "Look Alive",
        "Greetings",
        "Hi",
        "Good Afternoon",
        "Afternoon",
    ];

    const EveningGreetings = [`Good Evening`, `How was your day?`, `How have you been?`];

    useEffect(() => {
        const date = new Date().getHours();
        if (date <= 11) {
            setGreeting(
                AddNameBeforeQuestionMark(
                    MorinngGreetings[
                        Math.floor(Math.random() * (MorinngGreetings.length - 0 + 1) + 0)
                    ]
                )
            );
        } else if (date >= 12 && date <= 16) {
            setGreeting(
                AddNameBeforeQuestionMark(
                    AfternoonGreetings[Math.floor(Math.random() * AfternoonGreetings.length)]
                )
            );
        } else {
            setGreeting(
                AddNameBeforeQuestionMark(
                    EveningGreetings[Math.floor(Math.random() * EveningGreetings.length)]
                )
            );
        }
    }, []);

    function AddNameBeforeQuestionMark(text = "") {
        if (text[text.length - 1] === "?") {
            text = text.substring(0, text.length - 1);
            text = `${text} ${last}?`;
            return text;
        } else {
            text = `${text} ${last}!`;
            return text;
        }
    }
    return (
        <Box w="90%">
            <Heading>{greeting}</Heading>
        </Box>
    );
};

export default Greeting;
