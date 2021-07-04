import { useEffect } from 'react';
import { downloadTaheelDoc } from 'src/pages/account/data/AccountApi';

const DownloadDoc= () => {
    const DocID = '12820';
    const DocName = '';
    useEffect(async () => {
        const downloadDoc = await downloadTaheelDoc(DocID,DocName);
    }, []);
    return true;
};
export default DownloadDoc;
