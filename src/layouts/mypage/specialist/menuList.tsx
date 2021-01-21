import React, { MouseEvent } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import CreateIcon from '@material-ui/icons/Create';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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
    List,
    CssBaseline
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import styles from './menuList.module.css';

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
        fontSize: '30px'
    },
    menuText: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecoration: 'none',
    }
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

    const actionList = [
        {link: "/mypage/specialist/bizpacks/new", text: "BizBack作成", icon: <PersonAddIcon />},
        {link: "/mypage/specialist/portfolio/new", text: "過去事例作成", icon: <NoteAddIcon />},
        {link: "/mypage/specialist/bizpacks", text: "BizBack一覧", icon: <AssignmentIndIcon />},
        {link: "/mypage/specialist/portfolio", text: "過去事例一覧", icon: <LibraryBooksIcon />},
        {link: "/mypage/transactions", text: "取引一覧", icon: <NextWeekIcon />},
    ]

    return (
        <>
            <Grid justify="space-between" direction="column" container className={classes.menuList}>
                <CssBaseline />
                <Grid item>
                    <ul>
                        {actionList && actionList.map(action =>(
                            <li key={action.link} className={styles.list}>
                                <Link to={action.link} className={styles.link}>
                                    <div className={styles.list}>
                                        <div>{action.icon}</div>
                                        <div className={styles.text}>{action.text}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
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