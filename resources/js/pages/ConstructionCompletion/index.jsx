import React, { useState, useEffect } from "react";
import DataGridTable from "../../components/DataGridTable";
import { useLaravelReactI18n } from 'laravel-react-i18n';

const ConstructionCompletion = (props) => {
  const { t, tChoice } = useLaravelReactI18n();

  const constructionCompletionColumns = [
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
      field: 'construction_completion_date',
      headerName: t('Construction Completion Date'),
      editable: true,
      flex: 1,
    },
  ]

  const [constructions, setConstructions] = useState([]);

  return (
    <>
      <DataGridTable
        data={constructions}
        title={t('Construction Management')}
        column={constructionCompletionColumns}
      />
    </>
  )
}

export default ConstructionCompletion;