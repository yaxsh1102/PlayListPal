import React from 'react';
import Navbar from './Navbar';
import Discover from './Discover';
import { useSelector } from 'react-redux';
import SearchResults from './SearchResults';
import Searchbar from './Searchbar';

const LandingPage = () => {
    const searchToggle = useSelector((store)=>store.toggle.searchToggle)

    return ( 
      <>
        <div className='flex flex-col w-full items-center bg-gradient-to-tr from-[#000000] to-[#434343] fixed h-full  '>
            {!searchToggle ? 
            ( <><Navbar />
            <div className={`pb-[8rem] ${searchToggle ? (`pt-[12rem] `):('')} overflow-y-scroll w-[100%] flex justify-center items-center h-[90vh] overflow-x-hidden `}>
                <Discover></Discover>
            </div></>) 
         : 
         (<><Searchbar/><SearchResults></SearchResults> </>)}
        </div>
      </>

    );
}

export default LandingPage