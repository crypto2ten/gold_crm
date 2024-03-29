import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { FaHome, FaRegBuilding, FaGavel, FaYenSign, FaRegClone, FaUniversity, FaCog, FaUsers, FaEdit, FaTv, FaTable, FaMoneyCheckAlt,FaCoins, FaBuromobelexperte, FaBuffer, FaDollarSign, FaCommentDollar } from "react-icons/fa";
import {FiTrendingUp} from "react-icons/fi"
import styled from 'styled-components';

import styles from "./SideMenu.module.scss"
import { useResize, checkMobileDevice } from "./../../utils/Helper"

import { useLaravelReactI18n } from 'laravel-react-i18n'

import HailIcon from '@mui/icons-material/Hail';

const StyledSidebar = styled(Sidebar)`
  height: 100vh;
  color: #fff;
  border: none!important;

  &.ps-broken {
    &>div {
      box-shadow: none;
    }
  }

  &.ps-collapsed .ps-submenu-expand-icon > span{
    display: inline-block;
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    border-right: 2px solid currentcolor;
    border-bottom: 2px solid currentcolor;
    width: 7px;
    height: 7px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    border-radius: 0;
    background-color: transparent;
  }

  &>div {
    color: #a9b7d0;
    box-shadow: 1px 0 20px 0 #3f4d67;

    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-track {
      // background-color: rgb(245, 81, 17);
      // background-color: transparent;
      border-radius: 100px;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius      : 100px;
      background-clip    : content-box;
      // background-color: rgba(255, 255, 255, 0.1);
      background-color   : #3f4d67;
      transition: background-color .2s linear,width .2s ease-in-out;
      -webkit-transition: background-color .2s linear,width .2s ease-in-out;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color   : #9C9EA1;
      }
    }
  }
`

const StyledSubMenu = styled(SubMenu)`
  border: none;
  border-left: 3px solid transparent;
  user-select: none;

  &.ps-open {
    border-left-color: #1dc4e9;

    &>a {
      background-color: #333F54;
      color: #fff;
      &:hover {
        background: #333F54;
        color: #fff;
      }
    }
  }
  &:hover {
    background: transparent;
  }
  &>a {
    .ps-menu-icon {
      font-size: 18px;
      justify-content: flex-start;
      width: auto;
      min-width: auto;
      margin-right: 14px;
    }
    .ps-submenu-expand-icon>span {
      width: 7px;
      height: 7px;
    }
  }
  &>a:hover {
    background: transparent;
    color: #1dc4e9;
  }
  &>div {
    background: #39465E;
  }
`

const StyledTopMenuItem = styled(MenuItem)`
  user-select: none;

  &:hover {
    background: transparent;
  }

  &>a:hover {
    background: transparent;
    color: #fff;
  }

  &:first-child > a{
    height: 70px;

    &:hover {
      cursor: default;
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  border: none;
  border-left: 3px solid transparent;
  user-select: none;

  &.ps-active > a {
    background: transparent;
    color: #1dc4e9;
  }

  &:hover {
    background: transparent;
  }
  &>a {
    .ps-menu-icon {
      font-size: 18px;
      justify-content: flex-start;
      width: auto;
      min-width: auto;
      margin-right: 14px;
    }

    .ps-submenu-expand-icon>span {
      width: 7px;
      height: 7px;
    }
  }

  &>a:hover {
    background: transparent;
    color: #1dc4e9;
  }
`;

const SideMenu = () => {
  const { t, tChoice } = useLaravelReactI18n();

  const sidebarRef = useRef(null);

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
  const { isMobile } = useResize()

  const [clickedMobileMenu, setClickedMobileMenu] = useState(false);

  const toggle = () => {
    // toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  const clickMobileMenu = () => {
    setClickedMobileMenu((old) => !old)
    collapseSidebar(!clickedMobileMenu)
  }

  const sidebarMouseEnter = () => {
    if(clickedMobileMenu && collapsed) {
      collapseSidebar()
    }
  }

  const sidebarMouseLeave = () => {
    if(clickedMobileMenu && !collapsed) {
      collapseSidebar()
    }
  }

  const sidebarClick = () => {
    if(checkMobileDevice()) {
      if(clickedMobileMenu && collapsed) {
        collapseSidebar()
      }
    }
  }

  return (
    <>
      <StyledSidebar 
        customBreakPoint="992px"
        rtl={false}
        // image="/assets/image/bg-sidebar.jpg"
        className={styles.side_menu}
        ref={sidebarRef}
        collapsedWidth="75px"
        onMouseEnter={() => sidebarMouseEnter()}
        onMouseLeave={() => sidebarMouseLeave()}
        onClick={() => sidebarClick()}
      >
        <Menu>
          {
            !isMobile &&
              <StyledTopMenuItem
                icon={<div className={styles.bg_trendingup}><FiTrendingUp /></div>}
              >
                <div className={styles.b_brand}>
                  <span className={styles.b_text}>{ t('Side Menu Title') }</span>
                  {
                    !collapsed &&
                      <div className={`${styles.mobile_menu} ${(clickedMobileMenu ? styles.on : '')}`} onClick={() => clickMobileMenu()}><span></span></div>
                  }
                </div>
              </StyledTopMenuItem>
          }
          <StyledMenuItem icon={<HailIcon/>} component={<Link to="/customer_management" />}>{ t('Customer Management') }</StyledMenuItem>
          <StyledMenuItem icon={<FaUsers />} component={<Link to="/employee_list" />}>{ t('Employee List') }</StyledMenuItem>
          <StyledMenuItem icon={<FaBuffer />} component={<Link to="/construction_completion" />}>{ t('Construction Completion') }</StyledMenuItem>
          <StyledMenuItem icon={<FaCommentDollar />} component={<Link to="/payment_completion" />}>{ t('Payment Completion') }</StyledMenuItem>
          <StyledMenuItem icon={<FaBuromobelexperte />} component={<Link to="/inprogress_matter" />}>{ t('Inprogress Matter') }</StyledMenuItem>
          <StyledMenuItem icon={<FaCoins />} component={<Link to="/monthly_payment" />}>{ t('Monthly Payment') }</StyledMenuItem>
          <StyledMenuItem icon={<FaDollarSign />} component={<Link to="/salary_confirmation" />}>{ t('Salary Confirmation') }</StyledMenuItem>
          {/*
            <StyledSubMenu icon={<FaRegClone />} label={ t('Summing') }>
              <StyledMenuItem>{ t('Whole') }</StyledMenuItem>
              <StyledMenuItem>{ t('Annual A3') }</StyledMenuItem>
              <StyledMenuItem>{ t('Monthly A4') }</StyledMenuItem>
            </StyledSubMenu> 
          */}
        </Menu>
      </StyledSidebar>
      
    </>
  );
}

export default SideMenu