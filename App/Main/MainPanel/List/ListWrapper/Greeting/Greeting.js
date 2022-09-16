import { Box } from "native-base";
import { useSelector } from "react-redux";
import AnimatedText from "../../../../../Reusables/AnimatedText/AnimatedText";

function Greeting() {
    const { last } = useSelector((state) => state.account.name) || {};
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
    if (date <= 11) {
        return (
            <Box w="90%">
                <AnimatedText delay={2000}>
                    {MorinngGreetings[Math.floor(Math.random() * MorinngGreetings.length)].trim()}
                </AnimatedText>
            </Box>
        );
    } else if (date >= 12 && date <= 16) {
        return (
            <Box w="90%">
                <AnimatedText delay={2000}>
                    {AfternoonGreetings[
                        Math.floor(Math.random() * AfternoonGreetings.length)
                    ].trim()}
                </AnimatedText>
            </Box>
        );
    } else if (date >= 17) {
        return (
            <Box w="90%">
                <AnimatedText delay={2000}>
                    {EveningGreetings[Math.floor(Math.random() * EveningGreetings.length)].trim()}
                </AnimatedText>
            </Box>
        );
    } else
        return (
            <Box w="90%">
                <AnimatedText delay={2000}>"Hello!"</AnimatedText>
            </Box>
        );
}

export default Greeting;
