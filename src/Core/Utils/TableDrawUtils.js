import { useState } from 'react';
import {
    Button,
    Grid,
    Box,
    TableCell,
    IconButton,
    TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import FormCreator from '../Components/FormCreator';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuItem from '@material-ui/core/MenuItem';
import IconsList from '../Components/FieldsInputs/IconsList';

export function FilterCreator(props) {
    const tableShcema = props.schema, TPObject = props.TPObject, loading = props.loading
    console.log('TPObject', TPObject)
    console.log('tableShcema', tableShcema)
    console.log('loading', loading)
    const [filterData, setfilterData] = useState(/*() => {
         return tableShcema.schema.map((data) => {
                return {
                    fieldName: data.attrName,
                    fieldValue: ''
                }
        }) 
    }*/)
    const schema = tableShcema.schema.filter((data) => (!!data.filter))
    const handleSubmit = () => TPObject.dispatch({ payload: { filters: filterData } })
    function handleFilterData(schema, values) {
        setfilterData(() => {
            const value = e.target.value
            if (!!value.trim()) {
                if (filterData) {
                    let currentData = filterData.filter(data => data.fieldName === fieldName);
                    console.log('currentData', currentData[0])
                    if (operator === 'between') {
                        if (e.target.name = 'from') {
                            if (!!currentData[0]) {
                                return filterData.filter(data => data.fieldName !== fieldName).concat({ ...currentData, fieldValue: [currentData.fieldValue[0], value] })
                            } else {
                                return [{ fieldName: fieldName, fieldValue: [new Date(0), value], operator: operator }]
                            }
                        } else {
                            if (!!currentData) {
                                return filterData.filter(data => data.fieldName !== fieldName).concat({ ...currentData, fieldValue: [value, currentData.fieldValue[1]] })
                            } else {
                                return [{ fieldName: fieldName, fieldValue: [value, new Date(9000)], operator: operator }]
                            }
                        }
                    } else {
                        return filterData.filter(data => data.fieldName !== fieldName).concat({ fieldName: fieldName, fieldValue: value, operator: operator })
                    }
                } else {
                    return [{ fieldName: fieldName, fieldValue: value, operator: operator }]

                }
            } else {
                return filterData.filter(data => data.fieldName !== fieldName)
            }
        })
    }
    console.log('filterData ', filterData)
    const onSubmit = () => TPObject.dispatch({ payload: { filters: filterData } })
    const submitInfo = { btnName: 'بحث', onSubmit: onSubmit }
    const title = 'فلترة'
    return (schema?.length > 0 ? (
        <>
            {
                loading ?
                    <Skeleton /> :
                    <Box style={{ pointerEvents: loading ? "none" : '' }}>
                        <FormCreator schema={schema} title={title} submitInfo={submitInfo} />
                    </Box>
            }
        </>) : ('')
    )
}

export function TableButtonsDraw(props) {

    let tableShcemaActions = props.actions
    let responseData = props.responseData
    let loading = props.loading
    let index = props.index


    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (index, event) => {
        setAnchorEl({ [index]: event.currentTarget });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log("tableShcemaActions", tableShcemaActions)
    if (!!tableShcemaActions?.buttons) {
        if (tableShcemaActions.type === 'MoreVertIcon') {
            return (
                <TableCell key={index}>
                    {loading ? (<Skeleton />) :
                        <>
                            <IconButton aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleClick(index, e)}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl && anchorEl[index]}
                                keepMounted
                                open={Boolean(anchorEl && anchorEl[index])}
                                backgroundColor="primary"
                                onClose={handleClose}
                                margin={1}
                                spacing={1}
                            >
                                {
                                    tableShcemaActions.buttons.map((button, idx) => {
                                        return (
                                            <Button
                                                fullWidth={true}
                                                color="primary"
                                                key={button.id}
                                                onClick={() => button.btnFun(responseData)}
                                            >
                                                {button ? IconsList(!!button.iconTagFunc ? button.iconTagFunc(responseData) : button.iconTag, button.label.ar) : <Skeleton />}
                                            </Button>)
                                    })}
                            </Menu></>
                    }
                </TableCell>
            )
        } else {
            return (
                tableShcemaActions.buttons.map((button, idx) => (
                    <Button
                        fullWidth={true}
                        color="primary"
                        onClick={() => button.btnFun(responseData)}
                        key={button.id}
                    >
                        {!!responseData ?
                            IconsList(!!button.iconTagFunc ?
                                button.iconTagFunc(responseData)
                                : button.iconTag, button.label.ar)
                            : <Skeleton />}
                    </Button>
                ))
            )
        }
    }
    return ''
}

TableButtonsDraw.propTypes = {
    actions: PropTypes.object,
    responseData: PropTypes.object,
    loading: PropTypes.object,
}
FilterCreator.propTypes = {
    schema: PropTypes.object,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
}