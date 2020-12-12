import React, { useEffect }  from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';


import { useAppDispatch } from "../../../../src/app/storeHelper";

import {
    selectPortfolios,
    fetchAsyncGetPortfolios,
    fetchAsyncDeletePortfolio,
    editPortfolioId
} from "../mypageSlice"
import resGetPortfoliosType from '../resGetPortfolios.json'

type portfolio = typeof resGetPortfoliosType.data[0]

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

const PortfolioIndex: React.FC = () => {
    const asyncDispatch = useAppDispatch();
    const dispatch = useDispatch()
    const portfolios = useSelector(selectPortfolios)
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
    const initReshapePortfolioState = [{
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
    const [reshapePortfolios, setReshapePortfolios] = React.useState(initReshapePortfolioState);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const moveEditPortfolio = (portfolioId: number) => {
      setAnchorEl(null);
      dispatch(editPortfolioId(portfolioId))
      history.push("/mypage/portfolio/edit")
    };

    const DeletePortfolio = (portfolioId: number) => {
      asyncDispatch(fetchAsyncDeletePortfolio(portfolioId))
    }

    useEffect(()=>{
          const createData = (portfolio: portfolio): typeof initReshapePortfolioState[0] => {
            return {
                id: portfolio.ID,
                category: portfolio.category.type,
                title: portfolio.title,
                products: portfolio.products.map(p => {return {name: p.name}}),
                industry: portfolio.industry,
                scale: portfolio.scale,
                description: portfolio.description,
                unitPrice: portfolio.unitPrice,
                duration: portfolio.duration,
                isPublic: portfolio.isPublic
            }
        }

        asyncDispatch(fetchAsyncGetPortfolios())
        const rbps = portfolios.data.map((portfolio: portfolio) => {
            return createData(portfolio)
        })
        setReshapePortfolios(rbps)
    },[portfolios, asyncDispatch])

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
                {reshapePortfolios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                          <MenuItem onClick={() => moveEditPortfolio(row.id)}>編集</MenuItem>
                          <MenuItem onClick={() => DeletePortfolio(row.id)}>削除</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 50,100]}
            component="div"
            count={reshapePortfolios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      );
}

export default PortfolioIndex