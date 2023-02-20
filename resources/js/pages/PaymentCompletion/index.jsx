import React, { useState, useEffect } from "react";
import DataGridTable from "../../components/DataGridTable";
import { useLaravelReactI18n } from 'laravel-react-i18n';

const PaymentCompletion = (props) => {
  const { t, tChoice } = useLaravelReactI18n();

  const paymentCompletionColumns = [
    {
      field: 'customer_name',
      headerName: t('Customer Name'),
      maxWidth: 200,
      editable: false
    }, 
    {
      field: 'address',
      headerName: t('Address'),
      editable: true,
      flex: 1,
    },
    {
      field: 'deposit_date',
      headerName: t('Deposit Date'),
      editable: true,
      flex: 1,
    },
  ]

  const [payments, setPayments] = useState([]);
  
  return (
    <>
      <DataGridTable
        data={payments}
        title={t('Payment Completion')}
        column={paymentCompletionColumns}
      />
    </>
  )
}

export default PaymentCompletion;