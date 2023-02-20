import React, { useState, useEffect } from "react";
import DataGridTable from "../../components/DataGridTable";
import { useLaravelReactI18n } from 'laravel-react-i18n';

const EmployeeList = (props) => {
  const { t, tChoice } = useLaravelReactI18n();

  const employeeListColumns = [
    {
      field: 'name',
      headerName: t('Name'),
      maxWidth: 200,
      editable: false
    }, 
    {
      field: 'furigana',
      headerName: t('Furigana'),
      editable: true,
      flex: 1,
    },
    {
      field: 'my_number',
      headerName: t('My Number'),
      editable: true,
      flex: 1,
    },
    {
      field: 'address',
      headerName: t('Address'),
      editable: true,
      flex: 1,
    },
    {
      field: 'telephone',
      headerName: t('Telephone'),
      editable: true,
      flex: 1,
    },
    {
      field: 'birthday',
      headerName: t('Birthday'),
      editable: true,
      flex: 1,
    },
    {
      field: 'hire_date',
      headerName: t('Hire Date'),
      editable: true,
      flex: 1,
    },
    {
      field: 'fire_date',
      headerName: t('Fire Date'),
      editable: true,
      flex: 1,
    },
    {
      field: 'payroll_account_registration',
      headerName: t('Payroll Account Registration'),
      editable: true,
      flex: 1,
    },
    {
      field: 'bank_name',
      headerName: t('Bank Name'),
      editable: true,
      flex: 1,
    },
    {
      field: 'branch_number',
      headerName: t('Branch Number'),
      editable: true,
      flex: 1,
    },
    {
      field: 'branch_name',
      headerName: t('Branch Name'),
      editable: true,
      flex: 1,
    },
    {
      field: 'account_type',
      headerName: t('Account Type'),
      editable: true,
      flex: 1,
    },
    {
      field: 'account_number',
      headerName: t('Account Number'),
      editable: true,
      flex: 1,
    },
  ]

  const [employees, setEmployees] = useState([]);

  return (
    <>
      <DataGridTable
        data={employees}
        title={t('Employee List')}
        column={employeeListColumns}
      />
    </>
  )
}

export default EmployeeList;