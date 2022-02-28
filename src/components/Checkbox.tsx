import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles"

const CheckBoxIcon = styled('div')<{ checked?: boolean }>(({ theme, checked = false }) => {
    const palette = theme.palette;
    return {
        border: `1px solid`,
        borderColor: !checked ? palette.grey[500] : palette.primary.main,
        backgroundColor: !checked ? palette.background.paper : palette.primary.main,
        borderRadius: 2,
        boxSizing: "border-box",
        transition: "border .3s,background .3s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        '&[font-size="small"]': {
            width: 15,
            height: 15
        },
        "&:after": {
            content: '""',
            opacity: !checked ? 0 : '1 !important',
            borderColor: !checked ? palette.common.black : `${palette.common.white} !important`,
            border: '1px solid',
            borderTop: 'none',
            borderRight: 'none',
            width: 8,
            height: 4,
            marginBottom: 1,
            transform: 'rotate(-50deg)',
            transition: 'opacity .3s',
        },
        'input:hover ~ &': {
            borderColor: palette.primary.main
        },
        'input:hover ~ &:after': {
            opacity: .35
        }
    }
});

export function Checkbox(props: CheckboxProps) {
    return <MuiCheckbox
        icon={<CheckBoxIcon />}
        checkedIcon={<CheckBoxIcon checked />}
        size="small"
        {...props}
    />
}