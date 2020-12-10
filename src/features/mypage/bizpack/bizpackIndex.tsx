import React, { useEffect }  from 'react'
import { useSelector } from "react-redux"
import { Grid, CssBaseline, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'


import { useAppDispatch } from "../../../../src/app/storeHelper";

import {
    selectBizpacks,
    fetchAsyncGetBizpacks
} from "../mypageSlice"
import resGetBizpacksType from '../resGetBizpacks.json'
import { random } from 'lodash';

type bizpack = typeof resGetBizpacksType.data[0]

interface Column {
    id: 'category' | 'title' | 'products' | 'industry' | 'scale' | 'description' | 'unitPrice' | 'duration' | 'isPublic';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: 'category', label: 'カテゴリー', minWidth: 170 },
    { id: 'title', label: 'タイトル', minWidth: 170 },
    { id: 'products', label: 'プロダクト', minWidth: 170 },
    { id: 'industry', label: '業界', minWidth: 100 },
    { id: 'scale', label: '規模', align: 'right', minWidth: 70 },
    { id: 'description', label: '詳細', minWidth: 300 },
    { id: 'unitPrice', label: '単価', align: 'right', minWidth: 70 },
    { id: 'duration', label: '時間',  align: 'right', minWidth: 70 },
    { id: 'isPublic', label: 'ステータス', minWidth: 120 },
  ];

const BizPackIndex: React.FC = () => {
    const asyncDispatch = useAppDispatch();
    const bizpacks = useSelector(selectBizpacks)
    const history = useHistory()
    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
      });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const initReshapeBizpackState = [{
        id: 0,
        category: 1,
        products: [{name: ""}],
        industry: "",
        scale: 0,
        title: "",
        description: "",
        unitPrice: 0,
        duration: 0,
        isPublic: false
    }]
    const [reshapeBizpacks, setReshapeBizpacks] = React.useState(initReshapeBizpackState);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const createData = (bizpack: bizpack): typeof initReshapeBizpackState[0] => {
        return {
            id: bizpack.ID,
            category: bizpack.category.type,
            title: bizpack.title,
            products: bizpack.products.map(p => {return {name: p.name}}),
            industry: bizpack.industry,
            scale: bizpack.scale,
            description: bizpack.description,
            unitPrice: bizpack.unitPrice,
            duration: bizpack.duration,
            isPublic: bizpack.isPublic
        }
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (method: string) => {
      setAnchorEl(null);
      const user_id = Cookies.get('bd-uid')
      history.push(`/mypage/bizpack/${method}/${user_id}`)
    };

    useEffect(()=>{
        asyncDispatch(fetchAsyncGetBizpacks())
        const rbps = bizpacks.data.map((bizpack: bizpack) => {
            return createData(bizpack)
        })
        console.log(bizpacks)
        setReshapeBizpacks(rbps)
        // console.log(bizpacks)
    },[bizpacks, asyncDispatch])

    return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reshapeBizpacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        let value : string | number | JSX.Element[] | JSX.Element
                        if(column.id  === 'products'){
                            value = (row["products"]).map(product => {return<Chip size="small" label={product.name} />})
                        } else if (column.id  === 'isPublic' && row[column.id]) {
                            value =  "公開中"
                        } else if (column.id  === 'isPublic') {
                            value =  "下書き"
                        } else {
                            value = row[column.id]
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon />
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => handleClose('edit')}>編集</MenuItem>
                          <MenuItem onClick={() => handleClose('delete')}>削除</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50,100]}
            component="div"
            count={reshapeBizpacks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      );
}

export default BizPackIndex