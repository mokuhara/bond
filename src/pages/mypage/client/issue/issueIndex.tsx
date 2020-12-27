import React, { useEffect, useState }  from 'react'
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Menu, MenuItem , Modal, TextField} from '@material-ui/core';
import { makeStyles , Theme} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import {format} from 'date-fns'

import resIssueJson from './resIssue.json'
import fetcher from '../../../utils/fetcher'

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
      }));
    const classes = useStyles();
    const initTableData = {
        id: 0,
        category: "",
        title: "title",
        description: "",
        budget: 0,
        startAt: "2020-12-27T10:31:04.447893+09:00",
        applicationDeadline: "2020-12-27T10:31:04.447893+09:00",
        issue: resIssueJson
    }
    const categoryTypes = [
        {id: 1, name: "選定"},
        {id: 2, name: "導入"},
        {id: 3, name: "運用"},
    ]
    const apiUrl = "http://localhost:3000/v1";


    // transaction data
    type resIssue = typeof resIssueJson
    const [issues, setIssues] = useState([resIssueJson])
    type tableData = typeof initTableData[]
    const [tableData, setTableData] = useState([initTableData])
    const asyncGetIssues = async () => {
        const res = await fetcher<resIssue[]>(`${apiUrl}/mypage/issues`, {
            mode: 'cors',
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(res)
        return res
    }
    const createTableData = (issues: resIssue[]) => {
        const result =  issues.map(issue => {
            const category = (categoryTypes.filter(category => category.id === issue.categoryId))[0]
            return {
                id: issue.id,
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
    const demoData = [resIssueJson, resIssueJson, resIssueJson]
    // asyncGetIssues().then(res=> setIssues(res))
    useEffect(() => {
        const hoge = createTableData(demoData)
        setTableData(hoge)
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
            pathname: '/mypage/issue',
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
                                                <MenuItem onClick={() => moveIssue(row.issue)}>詳細</MenuItem>
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
        </>
      );
}

export default IssueIndex

