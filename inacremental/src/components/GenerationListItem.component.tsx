import { Button, Typography, Divider, ListItem, ListItemText, makeStyles, Collapse } from "@material-ui/core";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";
import VariableStore, { Generation, Member } from "../services/VariableStore";
import { ExpandLess, ExpandMore } from '@material-ui/icons'

type toggleDrawer = (anchor: string, open: boolean) => (event: any) => void

interface GenerationListItemProps {
    generation: Generation,
    anchor: string,
    toggleDrawer: toggleDrawer
}

const useStyles = makeStyles((theme) => ({
    button: {
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    divider: {
        borderTop: `thin solid ${theme.palette.divider}`,
        backgroundColor: undefined,
        height: undefined,
    }
}))

export const GenerationListItem: React.FC<GenerationListItemProps> = ({generation, anchor, toggleDrawer}) => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false);

    const handleMemberChange = (member: Member) => { 
        VariableStore.CurrentMember = member;
        toggleDrawer(anchor, false)
    }

    const memberWorkInProgess = (memberName: string) => {
        const workInProgress = "(Coming soon!)";
        return memberName.includes(workInProgress);
    }

    const handleClick = () => {
        setOpen(!open);
        console.log(open)
        toggleDrawer(anchor, true)
    }

    const generateLinks = (members: Member[]) => {
        return( 
            <div>
                {
                    members.map(member => {
                        return (
                            <ListItem 
                                key={nanoid()} 
                                button 
                                component={Link} 
                                to={member.name} 
                                onClick={() => handleMemberChange(member)} 
                                disabled={memberWorkInProgess(member.name)}
                            >
                                <ListItemText primary={member.name}/>
                            </ListItem>
                        );
                    })
                }
            </div>
        )
    }

    

    return(
        <div>
            <Divider className={classes.divider}/>
            <li>
                <Typography
                    display='block'
                    variant='overline'
                >
                    <Button onClick={handleClick} className={classes.button}>
                        {generation.generationName}
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                </Typography>
            </li>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {generateLinks(generation.members)}
            </Collapse>
        </div>
    );
}