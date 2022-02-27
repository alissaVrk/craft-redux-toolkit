import { Checkbox } from "components/Checkbox";
import { CraftItemType } from "features/craft-items";

export function CardTitleAndType(props: {
    title: string, 
    type: CraftItemType, 
    onSelect?:(isSelected: boolean) => void,
    isSelected: boolean 
}) {

    return (<div className="card-hover-name">
        <Checkbox 
            checked={props.isSelected} 
            onChange={e => props.onSelect?.(e.target.checked)}
        />
        <a className="item-title no-animate">{props.title}</a>
    </div>)
}