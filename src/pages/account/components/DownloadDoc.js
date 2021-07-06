import React, { useEffect, useState } from 'react';
import { downloadTaheelDoc } from '../data/AccountApi';

const DownloadDoc=()=> {
    const DocID = '13250';
    useEffect(async () => {
        const response = { isSuccessful: true, message: '' };
        const downloadDoc = await downloadTaheelDoc(DocID);
        if (!downloadDoc) {
            return { isSuccessful: false, message: ownerInfoUpdateRequest.message };
        }
        return response;
    }, []);
    return true;
    
};
export default DownloadDoc;
