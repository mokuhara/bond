import React, {useState, useEffect } from 'react'
import Layout from '../../../../../layouts/mypage/specialist/menuLists';
import { Grid, InputBase, IconButton, Paper } from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import { bizpacksState, resbizpacksState, transactionState } from './store'
import { apiUrl, get } from '../../../../../libs/fetch'

import styles from './index.module.css'
import Bizpack from './bizpack'

const useStyles = makeStyles((theme: Theme) => ({
    sideBar: {
        height: '600px',
        backgroundColor: 'rgb(242,243,243)',
        padding: '10px'
    },
    searchContainer: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
      },
    iconButton: {
        padding: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
}))

type transaction = typeof transactionState[0]
type resBizpack = typeof resbizpacksState[0]
const ClientBizPackIndex: React.FC = () => {
    const classes = useStyles()
    const [bizpacks, setBizpacks] = useState(bizpacksState)

useEffect(() => {
    const createData = (bizpack: resBizpack) => {
        return {
          id: bizpack.ID,
          category: bizpack.category.type,
          title: bizpack.title,
          products: bizpack.products.map(p => { return { name: p.name } }),
          industry: bizpack.industry,
          scale: bizpack.scale,
          description: bizpack.description,
          unitPrice: bizpack.unitPrice,
          duration: bizpack.duration,
          isPublic: bizpack.isPublic
        }
    }

    const filterBizpacks = async(bizpacks: resBizpack[]) => {
        const res = await get(`${apiUrl}/mypage/transaction/`)
                                            .then(result => result.json())

        if(res && res.data){
            const transactionBizpackIds = res.data.map((transaction: transaction)=> {return transaction.bizpackId})
            const bizpackIds = bizpacks.map(bizpack => {return bizpack.ID})
            const contractedBizpackIds = getDuplicateValues([...transactionBizpackIds, ...bizpackIds])
            return bizpacks.filter(bizpack => contractedBizpackIds.includes(bizpack.ID) )
        }
    }

    const getDuplicateValues = ([...array]) => {
        return array.filter((value, index, self) => self.indexOf(value) === index && self.lastIndexOf(value) !== index);
      }

    const fetchBizpacks = async () => {
        const res = await get(`${apiUrl}/mypage/client/bizpacks`)
                            .then(result => result.json())
        if(res && res.data){
            filterBizpacks(res.data).then((filteredBizpacks) => {
                if(!filteredBizpacks) return
                const reshapeBizpacks = filteredBizpacks.map((bizpack: resBizpack) => createData(bizpack))
                setBizpacks(reshapeBizpacks);
            })
        }
    }
    fetchBizpacks();
}, [])

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                {bizpacks.map(bizpack => {
                    return <Bizpack bizpack={bizpack}/>
                 })}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid className={classes.sideBar}>
                        {/* TODO 検索機能作成する */}
                        <Paper component="form" className={classes.searchContainer}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search"
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <div className={styles.sidebar}>
                            <p>search component</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ClientBizPackIndex