import React, { useState, useEffect } from "react";
import { useLaravelReactI18n } from 'laravel-react-i18n';

const Home = (props) => {
  const { t, tChoice } = useLaravelReactI18n();
  return (
    <>
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="page-header-title">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="main-body">
      <div className="page-wrapper">
        <div className="row"> 
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">企業リスト</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table_container">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Home