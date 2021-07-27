import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ButtonWithLoadingInput(data) {
    const [loading, setLoading] = useState(false);
    console.log('callBackFn',data.callBackFn)
    const handleOnClickFn = async () => {
        console.log(`loading ${loading}`);
        setLoading(true);
        await downloadFileFn(data.licenseDoc,data.label , data.executivePlan.id);
        console.log(`loading ${loading}`);
        setLoading(false);
        console.log(`loading ${loading}`);
    }
    const downloadFileFn = async (licenseDoc, name, licenceNumber) => {
        const url = 'taheel-apis-utilities-downloadDocument-v2';
        const fileName = `${name}-${licenceNumber}`;
        const queryParams = {
          DocID: licenseDoc,
          attachment: true,
        };
        try{
          await downloadFileAPI({ queryParams, url, fileName });
        } catch {
    
        }
        return;
      };
    console.log('data',data)
        return (
            <>
                {data && data.licenseDoc !== null ? (
                    !loading ? (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudDownloadIcon />}
                            onClick={() => downloadFileFn(data.callBackFn.licenseDoc,data.tLabel,data.callBackFn.licenseNumber)}
                        >
                            {data.tLabel}
                        </Button>
                    ) : (
                        <Skeleton />
                    )
                ) : (
                    <Skeleton />
                )}
            </>
        )
}