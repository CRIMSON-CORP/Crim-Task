import { Box, Heading } from "native-base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Greeting = () => {
    const { last } = useSelector((state) => state.account.name);
    const [greeting, setGreeting] = useState(null);
    const MorinngGreetings = [
        "What's up",
        "How are you",
        "Rise and Shine",
        "Hello there",
        "Good Morining",
        "Have a great day",
        "Look Alive",
        "Morining",
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

    const EveningGreetings = [
        `Good Evening ${last}`,
        `How was your day ${last}?`,
        `How have you been ${last}?`,
    ];

    useEffect(() => {
        const date = new Date().getHours();
        if (date <= 11) {
            setGreeting(
                MorinngGreetings[
                    Math.floor(Math.random() * (MorinngGreetings.length - 0 + 1) + 0)
                ] +
                    " " +
                    last
            );
        } else if (date >= 12 && date <= 14) {
            setGreeting(
                AfternoonGreetings[Math.floor(Math.random() * AfternoonGreetings.length)] +
                    " " +
                    last
            );
        } else {
            setGreeting(EveningGreetings[Math.floor(Math.random() * EveningGreetings.length)]);
        }
    }, []);
    return (
        <Box w="80%">
            <Heading fontSize={40} fontWeight={600}>
                {greeting}
            </Heading>
        </Box>
    );
};

export default Greeting;
