import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import DataGridTable from "../../components/DataGridTable";

import {
  startAction,
  endAction,
  showToast
} from '../../actions/common';

import agent from '../../api/';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import {BsExclamationCircle} from "react-icons/bs"

import { useLaravelReactI18n } from 'laravel-react-i18n';

import './CustomerManagement.scss'

const CustomerManagement = (props) => {
  const { t, tChoice } = useLaravelReactI18n();
  const dispatch = useDispatch();

  const customerManagementColumns = [
    {
      field: 'customer_name',
      headerName: t('Customer Name'),
      editable: true,
      flex: 1,
    }, 
    {
      field: 'name_of_person_in_charge',
      headerName: t('Name of person in charge'),
      editable: true,
      flex: 1,
    },
    {
      field: 'closing_name',
      headerName: t('Closing Name'),
      editable: true,
      flex: 1,
    },
    {
      field: 'postal_code',
      headerName: t('Postal Code'),
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
      field: 'mobilephone',
      headerName: t('Mobile Phone'),
      editable: true,
      flex: 1,
    },
    {
      field: 'sales',
      headerName: t('Sales'),
      editable: true,
      flex: 1,
    },
    {
      field: 'construction_start_date',
      headerName: t('Construction Start Date'),
      editable: true,
      flex: 1,
    },
    {
      field: 'construction_completion_date',
      headerName: t('Construction Completion Date'),
      editable: true,
      flex: 1,
    },
    {
      field: 'remarks',
      headerName: t('Remarks'),
      editable: true,
      flex: 1,
    },
  ]
  const [type, setType] = useState('create');
  const [customers, setCustomers] = useState([]);

  const addCustomerColumns = {
    name: ''
  }

  useEffect(() => {
    getCustomers()
  }, [])

  const handleSaveClick = async(data) => {
    if(type == 'create') {
      dispatch(startAction())
      try {
        const res = await agent.common.addCustomer(data)
        console.log(res);
        if (res.data.success) {
          setCustomers([...customers, res.data.data])
          getCustomers()
          dispatch(showToast('success', res.data.message))
        }
        else {
          dispatch(showToast('error', res.data.message))
        }
      } catch (error) {
        console.log(error);
        if (error.response.status >= 400 && error.response.status <= 500) {
          dispatch(showToast('error', error.response.data.message))
          if (error.response.data.message == 'Unauthorized') {
            localStorage.removeItem('token')
            dispatch(logout())
            navigate('/')
          }
        }
      }
      dispatch(endAction())
    } else if(type == 'update') {
      dispatch(startAction())
      try {
        const res = await agent.common.editCustomer(data.id, data)
        console.log(res);
        if (res.data.success) {
          dispatch(showToast('success', res.data.message))
          getCustomers()
        }
        else dispatch(showToast('error', res.data.message))
        dispatch(endAction())
      } catch (error) {
        console.log(error);
        if (error.response.status >= 400 && error.response.status <= 500) {
          dispatch(showToast('error', error.response.data.message))
          if (error.response.data.message == 'Unauthorized') {
            localStorage.removeItem('token')
            dispatch(logout())
            navigate('/')
          }
        }
      }
      dispatch(endAction())
    }
    setType('create');
  }
  
  const handleEditClick = () => {
    setType('update');
  }
  
  const handleDeleteClick= (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom_alert'>
            <h1><BsExclamationCircle /></h1>
            <p>本当に削除しますか？</p>
            <div className="btn_group">
              <button type="button" className="btn btn-secondary" onClick={onClose}>いいえ</button>
              <button type="button" className="btn btn-success" onClick={() => {onClose(); handleDeleteSbumit(id);}}>はい</button>
            </div>
          </div>
        );
      }
    });
  }

  const handleDeleteSbumit = async(id) => {
    dispatch(startAction())
    const res = await agent.common.deleteCustomer(id);
    if (res.data.success) {
      getCustomers();
      dispatch(showToast('success', res.data.message));
    }
    else dispatch(showToast('error', res.data.message));
    dispatch(endAction());
  }
  
  const handleCancelClick= () => {
    console.log('cancel');
  }

  const getCustomers = async() => {
    dispatch(startAction())
    try {
      const res = await agent.common.getCustomers()
      if (res.data.success) {
        setCustomers([...res.data.data])
      }
      dispatch(endAction())
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        dispatch(endAction())
        dispatch(showToast('error', error.response.data.message))
        if (error.response.data.message == 'Unauthorized') {
          localStorage.removeItem('token')
          dispatch(logout())
          navigate('/')
        }
      }
    }
  }

  return (
    <>
      <DataGridTable
        data={customers}
        title={t('Customer Management')}
        column={customerManagementColumns}
        addColumns={addCustomerColumns}
        clickEditBtn={() => handleEditClick()}
        clickDeleteBtn={(id) => handleDeleteClick(id)}
        clickCancelBtn={() => handleCancelClick()}
        clickSaveBtn={(data, type) => handleSaveClick(data, type)}
      />
    </>
  )
}

export default CustomerManagement;