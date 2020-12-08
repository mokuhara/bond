import React, { useEffect }  from 'react'
import { useSelector } from "react-redux"
import { Grid, CssBaseline, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import { useAppDispatch } from "../../../../src/app/storeHelper";

import {
    selectBizpacks,
    fetchAsyncGetBizpacks
} from "../mypageSlice"
import resGetBizpacksType from '../resGetBizpacks.json'
import { random } from 'lodash';

type bizpack = typeof resGetBizpacksType.data[0]

interface Column {
    id: 'products' | 'industry' | 'scale' | 'description' | 'unitPrice' | 'duration' | 'isPublic';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
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
        products: [{name: ""}],
        industry: "",
        scale: 0,
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
            products: bizpack.products.map(p => {return {name: p.name}}),
            industry: bizpack.industry,
            scale: bizpack.scale,
            description: bizpack.description,
            unitPrice: bizpack.unitPrice,
            duration: bizpack.duration,
            isPublic: bizpack.isPublic
        }
    }

    useEffect(()=>{
        asyncDispatch(fetchAsyncGetBizpacks())
        const rbps = bizpacks.data.map((bizpack: bizpack) => {
            return createData(bizpack)
        })
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