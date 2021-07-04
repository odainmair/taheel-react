import { useEffect } from 'react';
import { downloadTaheelDoc } from 'src/pages/account/data/AccountApi';
import { useParams } from 'react-router-dom';

const DownloadDoc = () => {
    let params = new URLSearchParams(document.location.search.substring(1));
    let DocID = params.get("DocID");
    let DocName = params.get("DocumentName");

    useEffect(async () => {

        console.log("params+++++++++++++", params);
        const downloadDoc = await downloadTaheelDoc(DocID,DocName);
    }, []);
    return true;

};
export default DownloadDoc;
