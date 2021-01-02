import React from 'react'
import { Chip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LoopIcon from '@material-ui/icons/Loop';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles , Theme} from '@material-ui/core/styles';


const categoryState = [
    {id: 0, name: "選択"},
    {id: 1, name: "構築"},
    {id: 2, name: "運用"},
]

const useStyles = makeStyles((theme: Theme) => ({
    categoryLabel: {
        fontSize: '10px',
    },
}));


const CategoryIcon:React.FC<{categoryId: number}> = ({categoryId}) => {
    const classes = useStyles();
    const text = (categoryState.filter(category => category.id === categoryId))[0].name
    const makeChip = (payload: {component: JSX.Element, text: string}) => {
        return (
            <Chip
                size="small"
                icon={payload.component}
                label={payload.text}
                className={classes.categoryLabel}
            />
        )
    }
    if(categoryId === 0) {
        return makeChip({component: <SearchIcon />, text: text})
    } else if (categoryId === 1) {
        return makeChip({component: <BuildIcon />, text: text})
    } else if (categoryId === 2) {
        return makeChip({component: <LoopIcon />, text: text})
    }
    return makeChip({component: <LoopIcon />, text: '未登録のカテゴリー'})
}

export default CategoryIcon