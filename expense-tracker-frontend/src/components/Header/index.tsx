import React from 'react'

const Header:React.FC = () => {
  return (
    <div className='text-center'>
      <header className='font-bold text-4xl text-blue-500'>Expense Tracker</header>
      <p className='text-blue-300'>Track your daily Expenses here</p>
    </div>
  );
}

export default Header;