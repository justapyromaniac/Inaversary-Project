import { List, ListItem, makeStyles } from "@material-ui/core";
import { Member } from "../../services/Member";
import { ShopItemComponent } from "./ShopItem.component";
import { nanoid } from 'nanoid'
import { useEffect, useState } from "react";
import { Generator } from "../../services/Generator";

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: 0
    },
}));

export const ShopListComponent: React.FC<Member> = (member: Member) => {
    const classes = useStyles();
    const [generators, setGenerators] = useState<Array<Generator>>([]);

    useEffect(() => {
        setGenerators(member.generators);
    }, [member.generators])

    return (
        <List>
            {generators.map(generator => {
                if(generator.generatorType === "passive") {
                    return(
                        <ListItem key={nanoid()} className={classes.listItem}>
                            <ShopItemComponent {...generator}/>
                        </ListItem>
                    );
                } else {
                    return null
                }
                
            })}
        </List>
    );
}