import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Paper,
  Typography,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import logo from '../assets/images/logo512.png';
import * as React from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export const DetailsCard = ({
  children,
  title,
  subheader,
  footer,
}: {
  children: React.ReactElement;
  title: string;
  subheader: string;
  footer: string;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='heading'>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia component='img' height='194' image={logo} alt='Logo Image' />
      <CardContent>{children}</CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Paper
            sx={{
              padding: '0.5rem',
              marginBlock: '0.5rem',
            }}
          >
            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                paddingInline: '0.5rem',
                fontSize: 'small',
              }}
            >
              Watch the changes directly on the canvas - Make sure to center
              your workflow by clicking on the{' '}
              {
                <FullscreenIcon
                  fontSize='small'
                  sx={{ margin: 0, padding: 0 }}
                />
              }{' '}
              button (bottom-left controls)
            </Typography>
            <Paper
              sx={{
                backgroundColor: 'whitesmoke',
                border: '1px solid grey',
                padding: '0.5rem',
                marginBlock: '0.5rem',
                overflow: 'clip',
                fontSize: 'xx-small',
              }}
            >
              <code>{footer}</code>
            </Paper>
          </Paper>
        </CardContent>
      </Collapse>
    </>
  );
};
