import { Box, Heading, Text, VStack } from "native-base";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TopBarSharedElements } from "../../../../utils/utils";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";
import TopBar from "../../../Reusables/TopBar";
const AnimatedVStack = Animated.createAnimatedComponent(VStack);
const HowToUse = () => {
    return (
        <Box flex={1} bg="primary.300" p="5" style={{ paddingTop: StatusBar.currentHeight + 20 }}>
            <VStack flex={1} space="10">
                <VStack space={16} flexGrow={1}>
                    <TopBar back />
                    <AnimatedText text="How to use the App" />
                </VStack>
                <ScrollView>
                    <VStack space="5">
                        <AnimatedVStack entering={FadeInDown.delay(1000).duration(1000)}>
                            <Heading fontSize={"sm"}>Open Side Bar</Heading>
                            <Text fontSize={"xs"}>
                                Im sure you must have opened the side bar to get here by clicking on
                                the menu button, good to note that you can also slide from the left
                                edge of the screen to do the same
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(1200).duration(1000)}>
                            <Heading fontSize={"sm"}>Creating a new Category</Heading>
                            <Text fontSize={"xs"}>
                                You can create a new Category by going to the Categories page from
                                the Side panel and clicking the Plus icon button at the bottom left,
                                this brings a Popup where you fill in the Category title and theme
                                color, then you click "Create new Category" {"\n\n"} If you don not
                                have any category, clicking the plus icon button in the home screen
                                will allow you to do so
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(1400).duration(1000)}>
                            <Heading fontSize={"sm"}>Creating a new Task</Heading>
                            <Text fontSize={"xs"}>
                                You can create a new Task by clicking the plus icon button at the
                                bottom right, this will bring a popup where you can fill in the task
                                subject. {"\n\n"}
                                Now, where you click the plus button matters,{"\n"}
                                Clicking it in the homescreen would let you create a new task if you
                                have one or more categories, when the popup opens, you would need to
                                fill in the subject and select the category you want the task to
                                belong to.{"\n\n"}
                                Clicking it after selecting a category will only let you fill in the
                                subject, as the category is already selected
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(1800).duration(1000)}>
                            <Heading fontSize={"sm"}>Editing a Category</Heading>
                            <Text fontSize={"xs"}>
                                You can edit the title and the Theme color of a category if you
                                touch and hold a Category card item, the popup will open and allow
                                you to change these details
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(2000).duration(1000)}>
                            <Heading fontSize={"sm"}>Editing a Task</Heading>
                            <Text fontSize={"xs"}>
                                You can edit the subject of a task or move it into another category
                                if you touch and hold a task item, the popup will open and alow you
                                to change these details, {"\n"}if you wish to move the task into
                                another category, the current category of the task will be initially
                                selected, then you can select another category and click "Edit Task"
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(2200).duration(1000)}>
                            <Heading fontSize={"sm"}>Searching for a Task</Heading>
                            <Text fontSize={"xs"}>
                                If you know a task's subject but dont remeber how to find it, you
                                can search for it by clicking the search icon to the top right, the
                                write down the subject of the task
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(2400).duration(1000)}>
                            <Heading fontSize={"sm"}>Deleteing a Task</Heading>
                            <Text fontSize={"xs"}>
                                You can delete a task by dragging it all the way to the left and
                                releasing it, you can do this anywhere you find a task
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(2600).duration(1000)}>
                            <Heading fontSize={"sm"}>Deleteing a Category</Heading>
                            <Text fontSize={"xs"}>
                                You can delete a Category the same way you delete a task, but you
                                can only do this at the Categories page
                            </Text>
                        </AnimatedVStack>
                        <AnimatedVStack entering={FadeInDown.delay(2800).duration(1000)}>
                            <Heading fontSize={"sm"}>Changing Account data</Heading>
                            <Text fontSize={"xs"}>
                                You can change your account data, Lastname, Firstname and profile
                                picture in settings
                            </Text>
                        </AnimatedVStack>
                    </VStack>
                </ScrollView>
            </VStack>
        </Box>
    );
};

HowToUse.sharedElements = () => {
    return TopBarSharedElements;
};

export default HowToUse;
