import React, { useEffect, useState }  from 'react'
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Menu, MenuItem , Modal, TextField} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import {format} from 'date-fns'

import { issueState, tableDataState } from './store'
import { get } from '../../../../../libs/fetch'


interface Column {
    id: 'category' | 'title' | 'description' | 'budget' | 'startAt' | 'applicationDeadline' | 'other';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'category', label: 'カテゴリー', minWidth: 170 },
    { id: 'title', label: 'タイトル', minWidth: 170 },
    { id: 'description', label: '詳細', minWidth: 300 },
    { id: 'budget', label: '予算', minWidth: 170 },
    { id: 'startAt', label: '開始時期', minWidth: 170 },
    { id: 'applicationDeadline', label: '応募期限', minWidth: 170},
    { id: 'other', label: 'その他', minWidth: 50}
];

const IssueIndex: React.FC = () => {
    const history = useHistory()
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
        tableBody: {
            fontSize: '13px',
        },
        moreMenue: {
            fontSize: '13px',
            fontWeight: 'bold',
            padding: '10px 20px'
        }
      }));
    const classes = useStyles();
    const categoryTypes = [
        {id: 1, name: "選定"},
        {id: 2, name: "導入"},
        {id: 3, name: "運用"},
    ]

    // transaction data
    type resIssue = typeof issueState
    type tableData = typeof tableDataState[]
    const [tableData, setTableData] = useState([tableDataState])

    const asyncGetIssues = async () => {
        const apiUrl = "http://localhost:8000/v1";
        get(`${apiUrl}/mypage/issue/`, {}, true)
              .then(res => res.json())
              .then(json => {
                setTableData(createTableData(json.data))
              })
    }

    const createTableData = (issues: resIssue[]) => {
        const result =  issues.map(issue => {
            const category = (categoryTypes.filter(category => category.id === issue.categoryId))[0]
            return {
                id: issue.ID,
                category: category.name,
                title: issue.title,
                description: issue.description,
                budget: issue.budget,
                startAt: format(new Date(issue.startAt), 'yyyy/MM/dd'),
                applicationDeadline: format(new Date(issue.applicationDeadline), 'yyyy/MM/dd'),
                issue: issue
            }
        })
        return result
    }

    const demoData = [issueState, issueState, issueState]
    useEffect(() => {
        asyncGetIssues()
        // const hoge = createTableData(demoData)
        // setTableData(hoge)
    },[])

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

    const moveIssue = (issue: resIssue) => {
        history.push({
            pathname: '/mypage/client/issue',
            state: {issue}
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
                                        <TableCell>
                                            <Button data-issue={JSON.stringify(row.issue)} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                <MoreVertIcon />
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem
                                                    className={classes.moreMenue}
                                                    onClick={() => {
                                                        const data = anchorEl? anchorEl.dataset.issue : ''
                                                        if(data){
                                                            const issue = JSON.parse(data)
                                                            moveIssue(issue)
                                                        }}
                                                }>詳細</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    )
                                } else {
                                    value = row[column.id]
                                    return (
                                    <TableCell key={column.id} align={column.align} className={classes.tableBody}>
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
        </>
      );
}

export default IssueIndex

