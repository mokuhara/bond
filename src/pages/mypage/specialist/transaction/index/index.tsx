import React, { useEffect, useState }  from 'react'
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Menu, MenuItem , Modal, TextField} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';


import VideoMeetingForm from '../videMeeting/new'
import CategoryIcon from '../../../../../components/categoryIcon'
import { get } from '../../../../../libs/fetch';
import { transactionState,  summrizedTransactionState, statusState } from './store'

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


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    tabaleHeader: {
        fontSize: '13px',
        color: 'rgba(0,16,14,0.55)',
    },
    categoryLabel: {
        fontSize: '10px',
    },
    tableBody: {
        fontSize: '13px',
    },
    moreMenue: {
        fontSize: '13px',
        fontWeight: 'bold',
        padding: '10px 20px'
    }
}));

const TransactionIndex: React.FC = () => {
    const history = useHistory()
    const classes = useStyles();


    // form validation
    const { register, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
    })


    // transaction data
    type transaction = typeof transactionState[0]
    type tableData = typeof summrizedTransactionState[]
    const [tableData, setTableData] = useState([summrizedTransactionState])
    const asyncGetTransactions = () => {
        const apiUrl = "http://localhost:8000/v1";
        get(`${apiUrl}/mypage/transaction/`, {}, true)
            .then(res => res.json())
            .then(json => {
                setTableData(createTableData(json.data))
            })
            .catch(e => {
                console.error(e)
            })
    }

    const createTableData = (transactions:transaction[] ) => {
        const createData = (transaction: transaction) => {
            return {
                id: transaction.ID,
                category: transaction.Bizpack.category.type,
                title: transaction.Bizpack.title,
                status: (statusState.filter(status => status.id === transaction.status))[0].name,
                description: transaction.Bizpack.description,
                transaction: transaction
            }
        }
        const result =  transactions.map(transaction => {
            return createData(transaction)
        })
        return result
    }

    useEffect(() => {
        asyncGetTransactions()
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

    //videoMeeting
    const [transactionId, setTransactionId] = useState(0)

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            className={classes.tabaleHeader}
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
                                        <TableCell >
                                            <Button data-transaction={JSON.stringify(row.transaction)} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                <MoreVertIcon />
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem className={classes.moreMenue} onClick={() => {
                                                    const data = anchorEl? anchorEl.dataset.transaction : ''
                                                    if (data) {
                                                        const transaction = JSON.parse(data)
                                                        moveTransaction(transaction)
                                                    }
                                                }}>詳細</MenuItem>
                                                {/* {row["transaction"].status < 6 && <MenuItem onClick={() => dummy()}>受注</MenuItem>} */}
                                                <MenuItem className={classes.moreMenue}  onClick={() => {
                                                    const data = anchorEl? anchorEl.dataset.transaction : ''
                                                    if (data) {
                                                        const transaction = JSON.parse(data)
                                                        setTransactionId(transaction.ID)
                                                        handleOpenModal()
                                                    }
                                                }}>web会議作成</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    )
                                } else if(column.id === 'category') {
                                    return (<TableCell align={column.align}>
                                        <CategoryIcon categoryId={row[column.id]}/>
                                    </TableCell>)
                                } else {
                                    value = row[column.id]
                                    return (
                                    <TableCell align={column.align}  className={classes.tableBody}>
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
                <VideoMeetingForm transactionId={transactionId}/>
            </Modal>
        </>
      );
}

export default TransactionIndex
