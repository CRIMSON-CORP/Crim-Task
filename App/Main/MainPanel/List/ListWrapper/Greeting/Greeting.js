import { Box } from "native-base";
import { useSelector } from "react-redux";
import AnimatedText from "../../../../../Reusables/AnimatedText/AnimatedText";

function Greeting() {
    const { last } = useSelector((state) => state.account.name) || {};
    console.log("Render Greeting");
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

    const date = new Date().getHours();
    if (date <= 11 && last) {
        return (
            <Box w="90%">
                <AnimatedText
                    text={MorinngGreetings[Math.floor(Math.random() * MorinngGreetings.length + 1)]}
                    type="Heading"
                />
            </Box>
        );
    } else if (date >= 12 && date <= 16) {
        return (
            <Box w="90%">
                <AnimatedText
                    text={
                        AfternoonGreetings[
                            Math.floor(Math.random() * AfternoonGreetings.length) + 1
                        ]
                    }
                    type="Heading"
                />
            </Box>
        );
    } else if (date > 17) {
        return (
            <Box w="90%">
                <AnimatedText
                    text={EveningGreetings[Math.floor(Math.random() * EveningGreetings.length) + 1]}
                    type="Heading"
                />
            </Box>
        );
    } else
        return (
            <Box w="90%">
                <AnimatedText text="Hello!" type="Heading" />
            </Box>
        );
}

export default Greeting;
