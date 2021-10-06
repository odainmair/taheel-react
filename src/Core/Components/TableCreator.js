import React from 'react';
import { useNavigate } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Container,
    Grid,
    Alert,
    CardHeader,
    CardContent,
    Divider,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    Card,
    TableRow,
    Badge,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PaginationDraw } from '../Utils/TablePagination';
import { FilterCreator, TableButtonsDraw } from '../Utils/TableDrawUtils';
import PropTypes from 'prop-types'
import IconsTypeEnum from '../Utils/IconsTypeEnum'
import Fab from '@mui/material/Fab';
import IconsList from './FieldsInputs/IconsList'

export default function TableCreator({ pageTitle, tableTitle, tableShcema, dataTable, totalCount, loading, TPObject, errMessage, otherFunc, navBackUrl, action }) {
    const navigateion = useNavigate()
    return (
        <>
            <Card style={{ padding: "20px", minHeight: "100%" }}>
                {!!pageTitle ?
                    <>
                        <CardHeader
                            title={!!navBackUrl ?
                                (
                                    <Grid container spacing={4}>
                                        <Grid item>
                                            <Badge
                                                badgeContent={
                                                    < Fab size="small" color="primary" aria-label="add" onClick={() => navigateion(navBackUrl.url, { state: navBackUrl.state })}>
                                                        <IconsList iconType={IconsTypeEnum.ARROW_FORWARD_ICON} color="info" />
                                                    </Fab>}
                                                onClick={() =>
                                                    navigateion(navBackUrl.url, { state: navBackUrl.state })
                                                }
                                            >
                                            </Badge>
                                        </Grid>
                                        <Grid item><p style={{ fontWeight: "bold" }} >{pageTitle} </p> </Grid>
                                    </Grid>
                                )
                                :
                                <p style={{ fontWeight: "bold" }} >{pageTitle} </p>
                            }
                        />
                        <Divider />
                    </> : <></>}

                <CardContent >
                    <Container maxWidth="lg" >
                        {errMessage && (
                            <Alert variant="outlined" severity={!!errMessage.type ? errMessage.type : "error"}>
                                {!!errMessage.msg ? errMessage.msg : errMessage}
                            </Alert>)
                        }
                        <Grid
                            container
                            lg={12}
                            md={6}
                            xs={12}
                            marginTop={3}
                            spacing={3}
                        >
                            <Grid item
                                lg={12}
                                md={12}
                                xs={12}
                                marginBottom={3}
                            >
                                <FilterCreator schema={tableShcema} TPObject={TPObject} loading={loading} />

                                <Card>
                                    {!!tableTitle ?
                                        <CardHeader title={tableTitle}
                                            action={action}
                                        /> : <></>}
                                    <Divider />
                                    <PerfectScrollbar>
                                        <Paper container >
                                            {loading ?
                                                (< Table >
                                                    <TableHead >
                                                        <TableRow
                                                            hover
                                                        > {
                                                                (Array.from(new Array(4)).map((d, idx) => (

                                                                    <TableCell key={idx}>
                                                                        <Skeleton />
                                                                    </TableCell>
                                                                )))
                                                            }
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            (Array.from(new Array(4)).map((d, idx) => (
                                                                <TableRow
                                                                    hover
                                                                    key={idx}
                                                                >
                                                                    {
                                                                        (Array.from(new Array(4)).map((d, idx) => (
                                                                            <TableCell key={idx}>
                                                                                <Skeleton />
                                                                            </TableCell>))
                                                                        )
                                                                    }
                                                                </TableRow>
                                                            )))
                                                        }
                                                    </TableBody>
                                                </Table>)
                                                :
                                                (<Table >
                                                    <TableHead >
                                                        <TableRow>
                                                            {tableShcema.schema.map((data) => (
                                                                <TableCell key={data.id} sortDirection="desc">
                                                                    {data.label.ar}
                                                                </TableCell>
                                                            ))}
                                                            {!!tableShcema.actions.label ?
                                                                (
                                                                    <TableCell key="btnsColumn">
                                                                        {tableShcema.actions.label.ar}
                                                                    </TableCell>
                                                                ) :
                                                                ('')
                                                            }
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            (((dataTable).map((responseData, index) => {
                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        key={responseData ? responseData.requestNum : index}
                                                                    >
                                                                        {tableShcema.schema.map((data, idx) => {
                                                                            let val = ''
                                                                            if (!!responseData) {
                                                                                val = responseData;
                                                                                val = data.name?.includes(".") ?
                                                                                    data['name'].split('.').map(attrName => (
                                                                                        val[attrName]
                                                                                    )) :
                                                                                    responseData[data['name']];
                                                                            }
                                                                            return (
                                                                                <TableCell key={idx}>
                                                                                    {responseData ?
                                                                                        (
                                                                                            !!data.attrFunc ?
                                                                                                (
                                                                                                    data.attrFunc(responseData)
                                                                                                )
                                                                                                : (
                                                                                                    val
                                                                                                )
                                                                                        )
                                                                                        : (
                                                                                            <Skeleton />
                                                                                        )
                                                                                    }
                                                                                </TableCell>
                                                                            )
                                                                        })}
                                                                        <TableButtonsDraw otherFunc={otherFunc} actions={tableShcema.actions} responseData={responseData} loading={loading} index={index} />
                                                                    </TableRow>
                                                                )
                                                            })
                                                            )
                                                            )
                                                        }
                                                        {dataTable?.length === 0 ? (<TableRow hover>
                                                            <TableCell colSpan={8} >
                                                                <p style={{ textAlign: 'center' }} >لا يوجد بيانات </p>
                                                            </TableCell>
                                                        </TableRow>) : <></>}
                                                    </TableBody>
                                                </Table>)
                                            }
                                        </Paper>
                                        {loading ? <Skeleton /> : <PaginationDraw totalCount={totalCount} TPObject={TPObject} loading={loading} />}
                                    </PerfectScrollbar>
                                </Card>
                            </Grid >
                        </Grid>
                    </Container >
                </CardContent>
            </Card>
        </>
    )

}
TableCreator.propTypes = {
    navBackUrl: PropTypes.string,
    pageTitle: PropTypes.string,
    tableTitle: PropTypes.string,
    tableShcema: PropTypes.object,
    dataTable: PropTypes.array,
    totalCount: PropTypes.number,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
    errMessage: PropTypes.string,
    otherFunc: PropTypes.func,
    action: PropTypes.object,
}