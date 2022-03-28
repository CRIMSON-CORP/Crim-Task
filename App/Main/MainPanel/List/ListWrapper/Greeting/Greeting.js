import { Box } from "native-base";
import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import AnimatedText from "../../../../../Reusables/AnimatedText/AnimatedText";

const Greeting = memo(() => {
    const { last } = useSelector((state) => state.account.name);
    const [greeting, setGreeting] = useState("");
    const MorinngGreetings = [
        `What's up ${last}?`,
        `How are you ${last}?`,
        `Rise and Shine ${last}!`,
        `Hello there ${last}!`,
        `Good Morining ${last}!`,
        `Have a great day ${last}!`,
        `Look Alive ${last}!`,
        `Morning ${last}!`,
    ];

    const AfternoonGreetings = [
        `What's up ${last}?`,
        `How are you ${last}?`,
        `Look Alive ${last}!`,
        `Greetings ${last}!`,
        `Hi ${last}!`,
        `Good Afternoon ${last}!`,
        `Afternoon ${last}!`,
    ];

    const EveningGreetings = [
        `Good Evening ${last}!`,
        `How was your day ${last}?`,
        `How have you been ${last}?`,
    ];

    useEffect(() => {
        const date = new Date().getHours();
        if (date <= 11 && last) {
            setGreeting(
                MorinngGreetings[Math.floor(Math.random() * (MorinngGreetings.length - 0 + 1) + 0)]
            );
        } else if (date >= 12 && date <= 16) {
            setGreeting(AfternoonGreetings[Math.floor(Math.random() * AfternoonGreetings.length)]);
        } else {
            setGreeting(EveningGreetings[Math.floor(Math.random() * EveningGreetings.length)]);
        }
    }, [last]);

    return <Box w="90%">{greeting && <AnimatedText text={greeting} type="Heading" />}</Box>;
});

export default Greeting;
