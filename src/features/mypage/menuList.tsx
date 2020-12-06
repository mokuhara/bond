import React, { MouseEvent } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import CreateIcon from '@material-ui/icons/Create';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link, useHistory } from 'react-router-dom';
import {
    ListItemAvatar,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    Badge,
    Menu,
    MenuItem,
    Grid,
    List
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    menuList: {
        height: '100%',
    },
  }),
);

const MenuList: React.FC = () =>{
    const classes = useStyles();
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = (category: string) => {
        setAnchorEl(null);
        history.push(`/mypage/${category}`)
      };

    return (
        <>
            <Grid justify="space-between" direction="column" container className={classes.menuList}>
                <Grid item>
                    <List>
                        <ListItem button component={Link} to={`/mypage/bizpack/create`} >
                            <ListItemIcon>
                                <CreateIcon />
                            </ListItemIcon>
                            <ListItemText primary="BizBack作成" />
                        </ListItem>
                        <ListItem button component={Link} to={`/mypage/portfolio/create`}>
                            <ListItemIcon>
                                <CreateIcon />
                            </ListItemIcon>
                            <ListItemText primary="過去事例作成" />
                        </ListItem>
                        <ListItem button component={Link} to={`/mypage/bizpack`}>
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary="BizBack一覧" />
                        </ListItem>
                        <ListItem button component={Link} to={`/mypage/portfolio`}>
                            <ListItemIcon>
                                <InsertDriveFileIcon />
                            </ListItemIcon>
                            <ListItemText primary="過去事例一覧" />
                        </ListItem>
                        <ListItem button component={Link} to={`/mypage/transaction`}>
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="取引一覧" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                                </Badge>
                            </ListItemIcon>
                            </ListItem>
                            <ListItem button>
                                <HelpIcon />
                            </ListItem>
                            <ListItem button key={1} onClick={handleClick}>
                                <ListItemAvatar>
                                <Avatar alt="user-icon" className={classes.small}>U</Avatar>
                                </ListItemAvatar>
                            </ListItem>

                            {/* TODO 別コンポーネントに切り出す */}
                            <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleClose('profile')}>プロフィール設定（工事中）</MenuItem>
                            <MenuItem onClick={() => handleClose('account')}>アカウント設定（工事中）</MenuItem>
                            <MenuItem onClick={() => handleClose('credit')}>支払い設定（工事中）</MenuItem>
                        </Menu>
                    </List>
                </Grid>
            </Grid>
        </>
)
}

export default MenuList