import { Helmet } from 'react-helmet';
import React from 'react';
import { useNavigate } from 'react-router';
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
import Skeleton from '@material-ui/lab/Skeleton';
import { PaginationDraw } from '../Utils/TablePagination';
import { FilterCreator, TableButtonsDraw } from '../Utils/TableDrawUtils';
import PropTypes from 'prop-types'
import IconsTypeEnum from '../Utils/IconsTypeEnum'
import IconsList from './FieldsInputs/IconsList'

export default function TableCreator({ tableTitle, tableShcema, dataTable, totalCount, loading, TPObject, errMessage, navBackUrl }) {
    const navigateion = useNavigate()
    return (
        <>
            <Helmet>
                <title>{tableTitle}</title>
            </Helmet>
            <Container maxWidth="lg" >
                {errMessage && (
                    <Alert variant="outlined" severity="error">
                        {errMessage}
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
                {!!navBackUrl ?
                    (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                                navigateion(navBackUrl.url, { state: navBackUrl.state })
                            }
                        >
                            {IconsList(IconsTypeEnum.ARROW_FORWARD_ICON, "العودة للخلف")}
                        </Button>)
                    :
                    ('')
                }
            </Container >
        </>
    )

}
TableCreator.propTypes = {
    navBackUrl: PropTypes.string,
    tableTitle: PropTypes.string,
    tableShcema: PropTypes.object,
    dataTable: PropTypes.object,
    totalCount: PropTypes.number,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
    errMessage: PropTypes.string,
}