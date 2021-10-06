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
import PropTypes from 'prop-types'

export default function IconsList(props) {
    const { iconType, label, color = 'primary' } = props
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
        EditIcon,
    }
    const IconTag = IconComponents[iconType]
    return (
        <>
            <IconTag
                color={color} /> {label}
        </>
    )
}
IconsList.propTypes = {
    label: PropTypes.string,
    iconType: PropTypes.string,
    color: PropTypes.string,
}