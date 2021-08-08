import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CentertDetails } from 'src/pages/services/final-license/services/finalLicenseAPI';
import { addCommissionerRs } from '../data/CentersApi';
import CommissionerDetailsSchema from '../Schema/CommissionerDetailsSchema';
import FormCreator from 'src/Core/Components/FormCreator';
const AddCommissioner = () => {
    const location = useLocation();
    const licenceNumber = location.state.licenceNumber;
    const [errMessage, SetErrMessage] = useState('');
    const [staffIds, SetStaffIds] = useState([])
    const [loading, setLoading] = useState(true)
    const title = " إضافة مفوض"
    const lookupObject = {

        'permissions': [
            {
                label: { ar: 'إضافة مستفيدين في المركز', en: 'Add beneficiaries in the center' },
                value: 1
            },
            {
                label: { ar: 'إصدار تراخيص مؤقتة', en: 'Issuance of temporary licenses' },
                value: 2
            },
            {
                label: { ar: 'إصدار تراخيص نهائية', en: 'Issuance of final licenses' },
                value: 3
            },
            {
                label: { ar: 'تعديل بيانات مستفيدين في المركز', en: 'Modify the data of beneficiaries in the center' },
                value: 4
            },
            {
                label: { ar: 'إضافة المركز في برنامج تحمل الدولة للرسوم', en: 'Adding the center to the state fee-bearing program' },
                value: 5
            },
            {
                label: { ar: 'إزالة مركز من برنامج تحمل الدولة للرسوم', en: 'Remove a center from the state fee-bearing program' },
                value: 6
            }],
        'staffId': staffIds.map(member => (
            {
                label: { ar: member.name, en: member.name },
                value: member.id,
            }
        ))
    }

    useEffect(async () => {
        const getCenterDetails = await CentertDetails(licenceNumber);
        if (!getCenterDetails.isSuccessful) {
            setLoading(false)
            response = { isSuccessful: false, message: getCenterDetails.message };
        } else {
            setLoading(false)
            SetStaffIds(getCenterDetails.responseBody.data.staff);
        }
    }, []);

    const onSubmit = async (values) => {
        const { staffId, email, jobTitle, permissions } = values;
        const addCommissioner = await addCommissionerRs(email, jobTitle, staffId, permissions);
        if (!addCommissioner.isSuccessful) {
            SetErrMessage(addCommissioner.message);
            return { isSuccessful: false, message: addCommissioner.message };
        }
        return response;
    }
    const submitInfo = {
        onSubmit: onSubmit,
        btnName: 'إضافة'

    }
    return (
        <>
            {
                <FormCreator
                    title={title}
                    schema={CommissionerDetailsSchema}
                    submitInfo={submitInfo}
                    lookupObject={lookupObject}
                    errMessage={errMessage}
                    isLoading={loading}
                    navBackUrl={{ url: '/app/CommissionersManagement', state: { licenceNumber }}}
                />
            }
        </>
    )
}
export default AddCommissioner;