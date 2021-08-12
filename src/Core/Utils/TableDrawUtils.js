import { useState } from 'react';
import {
    Button,
    Box,
    TableCell,
    IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types'
import FormCreator from '../Components/FormCreator';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import IconsList from '../Components/FieldsInputs/IconsList';
import { getValuesFromFilter } from './CoreUtils';

export function FilterCreator(props) {
    const tableShcema = props.schema, TPObject = props.TPObject, loading = props.loading, initValues = props.initValues
    const [filterData, setfilterData] = useState(/*() => {
         return tableShcema.schema.map((data) => {
                return {
                    fieldName: data.attrName,
                    fieldValue: ''
                }
        }) 
    }*/)
    let filterSchema = tableShcema.schema.filter((data) => (!!data.filter))

    function handleFilterData(value, fieldName, operator) {
        setfilterData(() => {
            value = value.trim();
            if (!!value) {
                if (filterData) {
                    let currentData = filterData.filter(data => data.fieldName === fieldName);
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
    let schema = []
    schema = schema.concat(filterSchema.map(field => {
        return { ...field, handleChange: handleFilterData, name: field['name'] }
    }));
    const onSubmit = () => TPObject.dispatch({ payload: { filters: filterData } })
    const submitInfo = { btnName: 'بحث', onSubmit: onSubmit }
    const title = 'فلترة'
    return (schema?.length > 0 ? (
        <>
            {
                loading ?
                    <Skeleton /> :
                    <Box style={{ pointerEvents: loading ? "none" : '' }}>
                        <FormCreator schema={schema} title={title} submitInfo={submitInfo} initValues={getValuesFromFilter(TPObject.pagination.filters?.filters)
                        } />
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
                                    tableShcemaActions.buttons.map((button) => {
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
                tableShcemaActions.buttons.map((button) => (
                    <Button
                        fullWidth={true}
                        onClick={() => button.btnFun(responseData)}
                        key={button.id}
                        startIcon={!!responseData ? IconsList(!!button.iconTagFunc ? button.iconTagFunc(responseData) : button.iconTag) : (<Skeleton />)}
                    >
                        {button.label.ar}
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
    loading: PropTypes.bool,
}
FilterCreator.propTypes = {
    initValues: PropTypes.object,
    schema: PropTypes.object,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
}