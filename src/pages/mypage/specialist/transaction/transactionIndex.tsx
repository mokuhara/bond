import React, { useEffect, useState }  from 'react'
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Menu, MenuItem , Modal, TextField} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import transactionJson from './transaction.json'
import fetcher from '../../../utils/fetcher'
import respVideoMeetingJson from  './resVideoMeeting.json'

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

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const TransactionIndex: React.FC = () => {
    const demoData = [transactionJson, transactionJson, transactionJson]
    const history = useHistory()
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
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
    const { register, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
      })
    const btnDisabler = Boolean(errors.topic) || Boolean(errors.startAt)
    type tableData = typeof initTableData[]
    type transaction = typeof transactionJson
    type transactions = transaction[]
    type videoMeeting = typeof transactionJson.videoMeetings[0]
    type payment = typeof transactionJson.payments[0]
    type review = typeof transactionJson.reviews[0]
    type respVideoMeeting = typeof respVideoMeetingJson

    const apiUrl = "http://localhost:3000/v1";


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

    const asyncCreatePayment = async (payment: payment) => {
        const res = await fetcher<payment>(`${apiUrl}/mypage/transaction/payment/create`, {
            mode: 'cors',
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payment)
        })
        return res
    }

    const asyncCreateVideoMeeting = async () => {
        const body =  {
            topic: videoMeeting.topic,
            type: "2",
            start_time: videoMeeting.start_time,
            timezone: "Asia/Tokyo",
            settings: {
                use_pmi: "false"
            }
        }

        const res = await fetcher<respVideoMeeting>(`${apiUrl}/mypage/videomeeting/create`, {
            mode: 'cors',
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if(res.data){
            setVideoMeeting({ ...videoMeeting, join_url: res.data.join_url})
        }
    }

    const [transactions, setTransactions] = useState([transactionJson])
    const [tableData, setTableData] = useState([initTableData])
    const [status, setStatus] = useState(transactionJson.status)
    const [review, setReview] = useState(transactionJson.reviews[0])
    const [videoMeeting, setVideoMeeting] = useState(transactionJson.videoMeetings[0])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    console.log(videoMeeting.join_url)

    const handleOpenModal = () => {
        setOpen(true);
      };

    const handleCloseModal = () => {
    setOpen(false);
    };

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

    const moveTransaction = (transaction: transaction) => {
        history.push({
            pathname: '/mypage/transaction',
            state: {transaction}
        })
    }

    // asyncGetTransactions().then(res=> setTransactions(res))
    useEffect(() => {
        const hoge = createTableData(demoData)
        console.log(hoge)
        setTableData(hoge)
    },[])

    const dummy = () => {}

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2>web会議を作成する</h2>
          <p>
            タイトルと日付を入力してください
          </p>
          <form className={classes.container} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="topic"
                name="topic"
                autoComplete="topic"
                autoFocus
                value={videoMeeting.topic}
                onChange={(e)=>{setVideoMeeting({ ...videoMeeting, topic: e.target.value})}}
                inputRef={register({ required: true })}
                error={Boolean(errors.topic)}
                helperText={errors.topic && "入力必須です"}
            />
            <TextField
                id="startAt"
                name="startAt"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e)=>{setVideoMeeting({ ...videoMeeting, start_time: e.target.value})}}
                inputRef={register({ required: true })}
                error={Boolean(errors.startAt)}
                helperText={errors.startAt && "入力必須です"}
            />
            <Button
                    fullWidth
                    // type="submit"
                    variant="contained"
                    color="primary"
                    disabled={btnDisabler}
                    onClick={()=>asyncCreateVideoMeeting()}
                >
                    bizpackを更新する
            </Button>
        </form>
        {videoMeeting.join_url && (<a href={videoMeeting.join_url}>video会議はこちら</a>)}
        </div>
    );

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
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
        
      );
}

export default TransactionIndex
