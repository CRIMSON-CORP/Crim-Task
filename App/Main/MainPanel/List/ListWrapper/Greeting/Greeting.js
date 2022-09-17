import { Box } from "native-base";
import { useSelector } from "react-redux";
import AnimatedText from "../../../../../Reusables/AnimatedText/AnimatedText";

function Greeting() {
    const { first } = useSelector((state) => state.account.name) || {};

    const MorinngGreetings = [
        `What's up ${first}?`,
        `How are you ${first}?`,
        `Rise and Shine ${first}!`,
        `Hello there ${first}!`,
        `Good Morining ${first}!`,
        `Have a great day ${first}!`,
        `Look Alive ${first}!`,
        `Morning ${first}!`,
    ];

    const AfternoonGreetings = [
        `What's up ${first}?`,
        `How are you ${first}?`,
        `Look Alive ${first}!`,
        `Greetings ${first}!`,
        `Hi ${first}!`,
        `Good Afternoon ${first}!`,
        `Afternoon ${first}!`,
    ];

    const EveningGreetings = [
        `Good Evening ${first}!`,
        `How was your day ${first}?`,
        `How have you been ${first}?`,
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
