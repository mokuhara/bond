import React, { useEffect, useState }  from 'react'
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Menu, MenuItem , Modal, TextField} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import transactionJson from './transaction.json'
import fetcher from '../../../utils/fetcher'
import VideoMeetingForm from './videoMeeting'

interface Column {
    id: 'category' | 'title' | 'status' | 'description' | 'other';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'category', label: 'カテゴリー', minWidth: 170 },
    { id: 'title', label: 'タイトル', minWidth: 170 },
    { id: 'status', label: 'ステータス', minWidth: 170 },
    { id: 'description', label: '詳細', minWidth: 300 },
    { id: 'other', label: 'その他', minWidth: 50}
];

const TransactionIndex: React.FC = () => {
    const history = useHistory()
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
      }));
    const classes = useStyles();
    const initTableData = {
        id: 0,
        category: 0,
        title: "title",
        status: 0,
        description: "description",
        transaction: transactionJson
    }
    const apiUrl = "http://localhost:3000/v1";


    // form validation
    const { register, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
    })

    //  payment
    type payment = typeof transactionJson.payments[0]
    // const asyncCreatePayment = async (payment: payment) => {
    //     const res = await fetcher<payment>(`${apiUrl}/mypage/transaction/payment/create`, {
    //         mode: 'cors',
    //         method: 'POST',
    //         cache: "no-cache",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(payment)
    //     })
    //     return res
    // }


    // transaction data
    type transaction = typeof transactionJson
    type transactions = transaction[]
    const [transactions, setTransactions] = useState([transactionJson])
    type tableData = typeof initTableData[]
    const [tableData, setTableData] = useState([initTableData])
    const asyncGetTransactions = async () => {
        const res = await fetcher<transactions>(`${apiUrl}/mypage/transaction`, {
            mode: 'cors',
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }
    const createTableData = (transactions: transactions) => {
        const result =  transactions.map(transaction => {
            return {
                id: transaction.id,
                category: transaction.bizpack.category.type,
                title: transaction.bizpack.title,
                status: transaction.status,
                description: transaction.bizpack.description,
                transaction: transaction
            }
        })
        return result
    }
    const demoData = [transactionJson, transactionJson, transactionJson]
    // asyncGetTransactions().then(res=> setTransactions(res))
    useEffect(() => {
        const hoge = createTableData(demoData)
        console.log(hoge)
        setTableData(hoge)
    },[])


    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => {
        setOpen(true);
      };
    const handleCloseModal = () => {
    setOpen(false);
    };


    // pagenation
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // moreMenue
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const moveTransaction = (transaction: transaction) => {
        history.push({
            pathname: '/mypage/transaction',
            state: {transaction}
        })
    }


    // accept button
    const dummy = () => {}

    return (
        <>
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
                        ))
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                let value : string | number | JSX.Element[] | JSX.Element
                                if(column.id === 'other'){
                                    return (
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
                                                <MenuItem onClick={() => moveTransaction(row.transaction)}>詳細</MenuItem>
                                                {row["status"]===0 && <MenuItem onClick={() => dummy()}>受注</MenuItem>}
                                                <MenuItem onClick={handleOpenModal}>web会議作成</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    )
                                } else {
                                    value = row[column.id]
                                    return (
                                    <TableCell key={column.id} align={column.align}>
                                        {value}
                                    </TableCell>
                                    );
                                }
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 50,100]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal
                open={open}
                onClose={handleCloseModal}
            >
                <VideoMeetingForm />
            </Modal>
        </>
      );
}

export default TransactionIndex
