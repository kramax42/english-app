import React from "react";
import styles from './AlphabetSearch.module.scss';
import { usePagination } from "libs/hooks";
import { Label, Loader, Segment } from "semantic-ui-react";
import { alphabet } from "libs/constants/alphabet";
import { usePageByLetter } from "libs/hooks/usePageByLetter";
import { AlphabetSearchProps } from "./AlphabetSearch.props";

export const AlphabetSearch = ({ highlightedLetters }: AlphabetSearchProps): JSX.Element => {
    const {
        setSkip,
        wordsPerPageCount,
    } = usePagination();

    const [activeLetterIndex, setActiveLetterIndex] = React.useState<number | null>(null);

    const { page, isPageLoading, pageError } = usePageByLetter({
        letter: !(typeof (activeLetterIndex) == 'object' && !activeLetterIndex) ? alphabet[activeLetterIndex] : null,
        limit: wordsPerPageCount,
    })

    React.useEffect(() => {
        if (page && page >= 1) {
            setSkip((page - 1) * wordsPerPageCount)
        }
    }, [page])

    if (isPageLoading && !(typeof (activeLetterIndex) == 'object' && !activeLetterIndex)) {
        return (
            <Segment>
                <Loader size='massive' active inline='centered' />
            </Segment>
        );
    }

    return (
        <Label.Group className={styles.wrapper} >
            {alphabet.map((letter, index) => {
                return (
                    <Label
                        className={styles.letter}
                        size="big"
                        key={letter}
                        color={highlightedLetters.includes(letter) ? "blue" : undefined}
                        onClick={() => setActiveLetterIndex(index)}
                    >
                        {letter}
                    </Label>
                )
            })
            }
        </Label.Group >
    )
}