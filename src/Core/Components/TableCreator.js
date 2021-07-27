import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Button,
    Container,
    Grid,
    Alert,
    CardHeader,
    Divider,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    Card,
    TableRow,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuItem from '@material-ui/core/MenuItem';
import { PaginationDraw } from '../Utils/TablePagination';
import { FilterCreator, TableButtonsDraw } from '../Utils/TableDrawUtils';
import PropTypes from 'prop-types'

export default function TableCreator({ tableTitle, tableShcema, dataTable, totalCount, loading, TPObject, errMessage }) {
    return (
        <>
            <Helmet>
                <title>{tableTitle}</title>
            </Helmet>
            <Container maxWidth="lg" >
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
                            <CardHeader title={
                                loading ? (
                                    <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
                                ) : (
                                    tableTitle
                                )
                            }
                            />
                            <Divider />
                            <PerfectScrollbar>
                                <Paper container >
                                    <Table >
                                        <TableHead >
                                            <TableRow>
                                                {tableShcema.schema.map((data) => (
                                                    <TableCell key={data.id} sortDirection="desc">
                                                        {loading ?
                                                            <Skeleton />
                                                            :
                                                            (
                                                                data.label.ar
                                                            )
                                                        }
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
                                                (loading || !!dataTable ? ((loading || !dataTable ? Array.from(new Array(4)) : dataTable).map((responseData, index) => {
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
                                                            <TableButtonsDraw actions={tableShcema.actions} responseData={responseData} loading={loading} index={index} />
                                                        </TableRow>
                                                    )
                                                })
                                                ) : (
                                                    <TableRow
                                                        hover
                                                    >
                                                        <TableCell colSpan={8} >
                                                            <p style={{ textAlign: 'center' }} >لا يوجد بيانات </p>
                                                        </TableCell>
                                                    </TableRow>)
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </Paper>

                                <PaginationDraw totalCount={totalCount} TPObject={TPObject} loading={loading} />

                            </PerfectScrollbar>
                        </Card>
                    </Grid >
                </Grid>
            </Container >
            {errMessage && (
                <Alert variant="outlined" severity="error">
                    {errMessage}
                </Alert>)
            }
        </>
    )

}
TableCreator.propTypes = {
    tableTitle: PropTypes.string,
    tableShcema: PropTypes.object,
    dataTable: PropTypes.object,
    totalCount: PropTypes.number,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
    errMessage: PropTypes.string,
}

/*
    const windowMaxPosition = useMemo(() => {
        return document.documentElement.scrollHeight;
    }
    )
    console.log('totalCount', totalCount)

     useEffect(() => {
        if (!!totalCount && !loading ) {
            document.addEventListener("scroll", (e) => handleScroll(e , batchSize), true)
        }else{
            document.removeEventListener("scroll", (e) => handleScroll(e), true)
        }
    }, [totalCount,batchSize,loading]
    )
    function handleScroll(e, bbatchSize) {
        console.log('loading', loading)
        let windowScrollPosition = e.srcElement.scrollTop
        console.log('document.documentElement.scrollTop ', e.srcElement.scrollTop)
        console.log('totalCount', totalCount)
        console.log('windowScrollPosition', windowScrollPosition)
        console.log('windowMaxPosition - (windowMaxPosition /2)', windowMaxPosition - (windowMaxPosition / 2))
        console.log('bbatchSize', bbatchSize)
        console.log('(windowMaxPosition - (windowMaxPosition / 2) > windowScrollPosition) && (totalCount > batchSize)', (windowMaxPosition - (windowMaxPosition / 2) > windowScrollPosition) && (totalCount > batchSize))
        if (!!totalCount && (totalCount > bbatchSize) && (windowMaxPosition - (windowMaxPosition * 0.75) > windowScrollPosition)) {
            batchSize(bbatchSize + 1)
        } else if (!!totalCount || totalCount === bbatchSize) {
            document.removeEventListener("scroll", (e) => handleScroll(e), true)
        }
    }*/
