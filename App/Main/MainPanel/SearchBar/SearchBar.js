import { Box, useTheme } from "native-base";
import { useFab, useSearch } from "../../../../utils/context";
import TaskItem from "../../../Reusables/TaskItem";
import TopBar from "../../../Reusables/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { AnimatePresence } from "moti";
export default function SearchBar() {
    const { value, results } = useSearch();
    const { colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary[300], zIndex: 9999 }}>
            <Box p="5" flex={1}>
                <TopBar />
                <SearchResultList results={results} value={value} />
            </Box>
        </SafeAreaView>
    );
}

function SearchResultList({ results }) {
    return (
        <Box pt="12" p="5">
            <AnimatePresence>
                {results.map((item, index) => {
                    return (
                        <TaskItem
                            key={item.id}
                            itemId={item.id}
                            task={item.task}
                            completed={item.completed}
                            categoryColor={item.categoryColor}
                            categoryId={item.categoryId}
                            index={index}
                            dark
                        />
                    );
                })}
            </AnimatePresence>
        </Box>
    );
}
