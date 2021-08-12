import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import ReportIcon from '@material-ui/icons/Report';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ForwardIcon from '@material-ui/icons/Forward';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function IconsList(iconType, label, sx) {
    const IconComponents = {
        AddIcon,
        DoneIcon,
        CreateIcon,
        ReportIcon,
        VisibilityIcon,
        KeyboardReturnIcon,
        ForwardIcon,
        FolderIcon,
        ArrowForwardIcon,
        ExitToAppSharpIcon,
        ArrowLeftIcon,
        DeleteIcon,
        EditIcon
    }
    const IconTag = IconComponents[iconType]
    const color = iconType==='DeleteIcon'? "secondary":'primary'
    return (
        <>
            <IconTag 
            color={color}/> {label}
        </>
    )
}