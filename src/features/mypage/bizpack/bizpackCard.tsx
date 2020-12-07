import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Chip } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tag: {
    margin: "3px"
  }
});

interface Props {
    producs: {name: string}[];
    industry: string;
    scale: number;
    description: string;
    unitPrice: number;
    duration: number;
    isPublic: boolean;
  }

 const BizpackCard:React.FC<{props: Props}> = ({props}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Chip size="small" className={classes.tag} label={props.isPublic ? "公開中": "下書き"} />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.producs && props.producs.map(product => {
              return (<Chip size="small" className={classes.tag} label={product.name} />)
          })}
        </Typography>
        <Typography variant="h5" component="h2">
          titleいれるかも
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            <Chip size="small" className={classes.tag} label={props.industry} />
            <Chip size="small" className={classes.tag} label={`人数規模: ${props.scale}`} />
        </Typography>
        <Typography variant="body2" component="p">
          { props.description }
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            <Chip size="small" className={classes.tag} label={`単価: ${props.unitPrice}`}  />
            <Chip size="small" className={classes.tag} label={`所用時間: ${props.duration}`}  />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">編集する</Button>
      </CardActions>
    </Card>
  );
}

export default BizpackCard