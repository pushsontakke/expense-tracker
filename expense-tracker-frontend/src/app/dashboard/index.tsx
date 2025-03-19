"use client";

import React from 'react'
import AddTransaction from '@/components/AddTransaction';
import Header from '@/components/Header';
import ExpenseTable from '@/components/Table';


const Dashboard: React.FC = () => {

  return (
    <React.Fragment>
      <Header />
      <AddTransaction />
      <div className="m-8 border p-4 rounded" >
        <ExpenseTable />
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
