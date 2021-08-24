import { List, ListItem, makeStyles } from "@material-ui/core";
import { useState, useCallback } from "react";
import { Member } from "../../services/Member";
import { nanoid } from 'nanoid'
import { UpgradeItemComponent } from "./UpgradeItem.component";
import { Upgrade } from "../../services/Upgrade";
import _ from 'lodash'
import VariableStore from "../../services/VariableStore";

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: 0
    },
}));

export const UpgradeListComponent: React.FC<Member> = (member: Member) => {
    const classes = useStyles();
    const [upgrades, setUpgrades] = useState<Array<Upgrade>>(_.difference(member.upgrades, VariableStore.getPurchasedUpgradesList));

    const removeUpgradeFromList = useCallback(() => {
        setUpgrades(_.difference(upgrades, VariableStore.getPurchasedUpgradesList))
    }, [upgrades])

    return(
        <List>
            {upgrades.map(upgrade => {
                return(
                    <ListItem key={nanoid()} className={classes.listItem}>
                        <UpgradeItemComponent upgrade={upgrade} onPurchase={removeUpgradeFromList}/>
                    </ListItem>
                );
            })}
        </List>
    );
}