import React, { useEffect } from 'react'
import Layout from '../../../../../layouts/mypage/specialist';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import resGetBizpacksType from '../resGetBizpacks.json'
import bizpacksState from './store'
import { apiUrl, get, destroy } from '../../../../../libs/fetch';
import { nanoid } from 'nanoid'

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
  { id: 'duration', label: '時間', align: 'right', minWidth: 70 },
  { id: 'isPublic', label: 'ステータス', minWidth: 120 },
];

const BizPackIndex: React.FC = () => {
  const history = useHistory()

  // ページネーション設定
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage = Number(event.target.value)
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  // メニュー操作(material ui)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const moveEditBizpack = (bizpackId: number) => {
    setAnchorEl(null);
    history.push(`/mypage/bizpack/${bizpackId}/edit`)
  };

  const DeleteBizpack = async (bizpackId: number) => {
    // bizpack削除
    const res = await destroy(`${apiUrl}/mypage/bizpacks/${bizpackId}`)
                        .then(result => result.json())
    if (res.result) {
      // bizpacksから該当のIDのオブジェクトを除く
      const newBizpacks = bizpacks.filter(bizpack => bizpack.id != bizpackId)
      setBizpacks(newBizpacks)
    }
  }

  // bizpackの取得, 設定
  const [bizpacks, setBizpacks] = React.useState(bizpacksState);

  useEffect(() => {
    const createData = (bizpack: bizpack) => {
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

    // fetch get で bizpackのリストを取得
    const fetchBizpacks = async () => {
      const res = await get(`${apiUrl}/mypage/bizpacks`)
                          .then(result => result.json());
      const bizpacks = res.data.map((bizpack: bizpack) => createData(bizpack));
      setBizpacks(bizpacks);
    };

    fetchBizpacks();
  }, [])

  // スタイル定義
  const classes = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  })();

  return (
    <Layout>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={`key-${nanoid(8)}`}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key={`key-${nanoid(8)}`} />
              </TableRow>
            </TableHead>
            <TableBody>
              {bizpacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`key-${nanoid(8)}`}>
                    {columns.map((column) => {
                      let value: string | number | JSX.Element[] | JSX.Element
                      if (column.id === 'products') {
                        value = (row["products"]).map(product => <Chip key={`ID-${nanoid(8)}`} size="small" label={product.name} />)
                      } else if (column.id === 'isPublic' && row[column.id]) {
                        value = "公開中"
                      } else if (column.id === 'isPublic') {
                        value = "下書き"
                      } else {
                        value = row[column.id]
                      }
                      return (
                        <TableCell key={`key-${nanoid(8)}`} align={column.align}>
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
                        <MenuItem onClick={() => moveEditBizpack(row.id)}>編集</MenuItem>
                        <MenuItem onClick={() => DeleteBizpack(row.id)}>削除</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={bizpacks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
}

export default BizPackIndex